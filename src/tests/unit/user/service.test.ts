import { INewUser } from '../../../interfaces/userInterface';
import { UserRepositoryInMemory } from '../../../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../../../repositories/IUserRepositories';
import { UserService } from '../../../services/UserService';
import { BadRequestError } from '../../../errors/badRequestError';
import { NotFoundError } from '../../../errors/notFoundError';


describe('User service', () => {

    let userRepository: IUserRepository;
    let userService: UserService;

    beforeAll(() => {
        userRepository = new UserRepositoryInMemory();
        userService = new UserService(userRepository);
    });
    describe('Create user', () => {
        it('Deve ser possível criar um usuário', async () => {
            const userData: INewUser = {
                name: 'Test Name',
                email: 'test@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            const user = await userService.create(userData);
            expect(user).toHaveProperty('id');
        });

        it('Não deve ser possível criar um usuário que tem um email já cadastrado', async () => {
            const userData: INewUser = {
                name: 'Test Name',
                email: 'test@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            await expect(userService.create(userData)).rejects.toEqual(
                new BadRequestError('Email already exists')
            );
        });
    });

    describe('List user', () => {
        it('Deve ser possível listar todos os usuários', async () => {
            const users = await userService.list();
            expect(Array.isArray(users)).toBe(true);
        });
    });

    describe('List user by id', () => {
        it('Deve ser possíver pesquisar um usuário', async () => {
            const userData: INewUser = {
                name: 'Test List By Id',
                email: 'testListById@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            const user = await userService.create(userData);
            const searchUser = await userService.listById(user.id);

            expect(user).toEqual(searchUser);
        });

        it('Não deve ser possivel pesquisar um usuário que não existe', async () => {
            await expect(userService.listById(-1)).rejects.toEqual(
                new NotFoundError('No user found')
            );
        });
    });

    describe('Delete user', () => {
        it('Deve ser possível excluir um usuário', async () => {
            const userData: INewUser = {
                name: 'Test Delete',
                email: 'testDelete@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            const user = await userService.create(userData);
            await userService.delete(user.id);
            
            await expect(userService.listById(user.id)).rejects.toEqual(
                new NotFoundError('No user found')
            );
        });
    });

    describe('Update User', () => {
        it('Deve ser possível atualizar um usuário', async () => {
            const userData: INewUser = {
                name: 'Test Before Update',
                email: 'testBeforeUpdate@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            const user = await userService.create(userData);

            const userUpdateData: INewUser = {
                name: 'Test After Update',
                email: 'testAfterUpdate@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            const userUpdate = await userService.update(user.id, userUpdateData);

            expect(userUpdate.name).toEqual('Test After Update');
            expect(userUpdate.email).toEqual('testAfterUpdate@test.com');
        });

        it('Não deve ser possível atualizar um email que já existe', async () => {
            const userData: INewUser = {
                name: 'Test Update',
                email: 'testUpdate@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            const user = await userService.create(userData);

            const userUpdateData: INewUser = {
                name: 'Test Update',
                email: 'test@test.com',
                contact: '(00) 12345-6789',
                password: 'test123'
            };

            await expect(userService.update(user.id, userUpdateData)).rejects.toEqual(
                new BadRequestError('Email already exists')
            );
        });
    });
});