import { IUserRepository } from '../IUserRepositories';
import { v4 as uuid } from 'uuid';
import { ISafeUser, IUser } from '../../interfaces/userInterface';

interface UserMemory {
    id: number;
    name: string;
    email: string;
    contact: string;
    password: string;
}

class UserRepositoryInMemory implements IUserRepository {
    private users: UserMemory[] = [];

    async create(user: IUser): Promise<ISafeUser> {
        const createdUser: ISafeUser = Object.assign(user, { 
            id: uuid(),
        });

        this.users.push(user);

        return createdUser;
    }

    async getAll(): Promise<ISafeUser[]> {
        const users: ISafeUser[] = this.users; 
        return users;
    }

    async update(id: number, user: IUser): Promise<ISafeUser> {
        let userKey = 1;
        Object.entries(this.users).forEach(userEntry => {
            const [key, value] = userEntry;
            userKey = Number(key);
            if (value.id == id) {
                if (user.name)
                    this.users[Number(key)].name = user.name;

                if (user.email)
                    this.users[Number(key)].email = user.email;

                if (user.contact)
                    this.users[Number(key)].contact = user.contact;

                if (user.password)
                    this.users[Number(key)].password = user.password;
            }
        });

        const updateUser: ISafeUser = this.users[userKey];
        return updateUser;
    }

    async delete(id: number): Promise<void> {
        Object.entries(this.users).forEach(userEntry => {
            const [key, value] = userEntry;
            if (value.id == id) {
                delete this.users[Number(key)];
            }
        });
    }

    async findById(id: number): Promise<ISafeUser | null> {
        let user: ISafeUser | null = null;
        this.users.forEach(object => {
            if (object.id == id) {
                user = object;
            }
        });

        return user;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        let user;
        this.users.forEach(object => {
            if (object.email == email) {
                user = object;
            }
        });

        if (user)
            return user;

        return null;
    }

    async exists(id: number): Promise<boolean> {
        return !! await this.findById(id);
    }
}

export { UserRepositoryInMemory };