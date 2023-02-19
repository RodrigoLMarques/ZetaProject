import { IUserRepository } from '../repositories/IUserRepositories';
import { ISafeUser, IUserLogin, INewUser } from '../interfaces/userInterface';
import { BadRequestError } from '../errors/badRequestError';
import { NotFoundError } from '../errors/notFoundError';
import { secret, options } from './../config/jwtConfig';
import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');

class UserService {

    constructor(
        private model: IUserRepository
    ) {}

    public async login(user: IUserLogin) {
        // Verifica se o email e senha são válidos
        const registeredUser = await this.model.findByEmail(user.email);

        if (!registeredUser) 
            throw new BadRequestError('Email or password invalid');
        
        const verifyPass = await bcrypt.compare(user.password, registeredUser.password);

        if (!verifyPass) 
            throw new BadRequestError('Email or password invalid');
        
        // Cria o token
        const idToken = registeredUser.id;
        const token = jwt.sign({ idToken }, secret, options);

        return {
            id: registeredUser.id,
            name: registeredUser.name,
            email: registeredUser.email,
            contact: registeredUser.contact,
            token: token
        };
    }

    public async list(): Promise<ISafeUser[]> {
        // Lista todos usuários do model User
        const users: ISafeUser[] = await this.model.getAll();
        return users;
    }

    public async create(user: INewUser): Promise<ISafeUser> {
        // Valida se o email que vai ser inserido já existe no model User
        const userEmail = await this.model.findByEmail(user.email);
        if (userEmail) {
            throw new BadRequestError('Email already exists');
        }
        
        // Criptografa a senha em hash e insere o usuário no model User
        user.password = await bcrypt.hash(user.password, 10);
        const createdUser = this.model.create(user);
        return createdUser;
    }

    public async listById(id: number): Promise<ISafeUser | null> {
        // Valida se o id existe    
        const result = await this.model.exists(id);
        if (!result) 
            throw new NotFoundError('No user found');
        
        // Lista o usuário de um determinado id
        const user: ISafeUser | null = await this.model.findById(id);
        return user;
    }

    public async delete(id: number) {
        // Deleta um usuário de um determinado id
        await this.model.delete(id);
    }

    public async update(id: number, user: INewUser): Promise<ISafeUser> {
        // Valida se o email que vai ser atualizado já existe no model User
        if (user.email) {
            const userEmail = await this.model.findByEmail(user.email);
            if (!!userEmail && userEmail.id != id) {
                throw new BadRequestError('Email already exists');
            }
        }
        
        // Atualiza os dados de um usuário de um determinado id
        if (user.password) 
            user.password = await bcrypt.hash(user.password, 10);
            
        const userUpdate = await this.model.update(id, user);
        return userUpdate;
    }
}

export { UserService };