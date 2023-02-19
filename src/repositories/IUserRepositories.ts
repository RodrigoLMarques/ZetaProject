import { INewUser, ISafeUser, IUser } from '../interfaces/userInterface';

interface IUserRepository {
    create(user: INewUser): Promise<ISafeUser>;
    getAll(): Promise<ISafeUser[]>;
    update(id: number, user: INewUser): Promise<ISafeUser>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<ISafeUser | null>;
    findByEmail(email: string): Promise<IUser | null>
    exists(id: number): Promise<boolean>;
}

export { IUserRepository };
