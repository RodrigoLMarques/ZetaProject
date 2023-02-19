import { prisma } from './client';
import { INewUser, ISafeUser, IUser } from '../../interfaces/userInterface';
import { IUserRepository } from '../IUserRepositories';

class PrismaUserRepository implements IUserRepository {
    private returnFields = { id: true, name: true, email: true, contact: true };

    async create({ name, email, contact, password }: INewUser): Promise<ISafeUser> {
        const createdUser = await prisma.user.create({
            data: {
                name,
                email,
                contact,
                password,
            },
            select: this.returnFields,
        });

        return createdUser;
    }

    async getAll(): Promise<ISafeUser[]> {
        const users = await prisma.user.findMany({
            select: this.returnFields,
        });
        return users;
    }

    async update(id: number, user: INewUser): Promise<ISafeUser> {
        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data: user,
            select: this.returnFields,
        });

        return updatedUser;
    }

    async delete(id: number): Promise<void> {
        await prisma.user.delete({
            where: {
                id,
            },
        });
    }

    async findById(id: number): Promise<ISafeUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: this.returnFields,
        });

        return user;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async exists(id: number): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return !!user;
    }
}

export { PrismaUserRepository };