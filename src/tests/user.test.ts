/**
 * @jest-environment ./prisma/prisma-environment-jest
*/


import { INewUser } from '../interfaces/userInterface';
import { UserRepositoryInMemory } from '../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../repositories/IUserRepositories';
import { UserService } from '../services/UserService';
import { BadRequestError } from '../errors/badRequestError';
import { NotFoundError } from '../errors/notFoundError';
import { IUserPayload } from '../interfaces/userInterface';
import { secret, options } from './../config/jwtConfig';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../app';

describe('User', () => {

    let userRepository: IUserRepository;
    let userService: UserService;

    beforeAll(() => {
        userRepository = new UserRepositoryInMemory();
        userService = new UserService(userRepository);
    });

    describe('User service', () => {
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

    describe('Rota de criar usuário', () => {
        it('Deve ser possível criar um usuário', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Create',
                    email: 'testCreate@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                })
                .expect(201);

            expect(response.body.response).toHaveProperty('id');
            expect(response.body.response).not.toHaveProperty('password');
        });

        it('Não deve ser possível criar um usuário que tem um email já cadastrado', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Create',
                    email: 'testCreate@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                })
                .expect(400);

            expect(response.body.error).toEqual('Email already exists');
        });

        it('Não deve ser possível criar um novo usuário faltando informações', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Create',
                    email: 'testCreate@test.com',
                    password: 'test123'
                })
                .expect(400);

            expect(response.body.error).toEqual('contact is required');
        });
    });
    
    describe('Rota de listar usuário', () => {
        it('Deve ser possível listar todos os usuários', async () => {
            const response = await request(app)
                .get('/api/users')
                .expect(200);

            expect(Array.isArray(response.body.response)).toBe(true);
        });
    });

    describe('Rota de listar usuário por id', () => {
        it('Deve ser possível pesquisar um usuário', async () => {
            const responseCreate = await request(app)
                .post('/api/users')
                .send({
                    name: 'Test List By Id',
                    email: 'testListById@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                });

            const url = '/api/users/' + responseCreate.body.response.id;
            const response = await request(app).get(url).expect(200);

            expect(response.body.response).toEqual(responseCreate.body.response);
        });

        it('Não deve ser possivel pesquisar um usuário que não existe', async () => {
            const response = await request(app)
                .get('/api/users/999')
                .expect(404);

            expect(response.body.error).toEqual('No user found');
        });
    });

    describe('Rota de login', () => {
        it('Deve ser possível fazer o login de um usuário',async () => {
            await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Login',
                    email: 'testLogin@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                });
            
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'testLogin@test.com',
                    password: 'test123'
                })
                .expect(200);

            expect(response.body.response).toHaveProperty('token');
            const { idToken } = jwt.verify(response.body.response.token, secret) as IUserPayload;
            expect(response.body.response.id).toEqual(idToken);
        });

        it('Não deve permitir um login inválido', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'testLogin@test.com',
                    password: 'invalid'
                })
                .expect(400);

            expect(response.body.response).not.toHaveProperty('token');
        });
    });

    describe('Rota de deletar usuário', () => {
        it('Deve ser possivel deletar um usuário', async () => {
            await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Delete',
                    email: 'testDelete@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                });
            
            const responseLogin = await request(app)
                .post('/api/login')
                .send({
                    email: 'testDelete@test.com',
                    password: 'test123'
                });

            const {id, token} = responseLogin.body.response;

            await request(app)
                .delete( '/api/users/' + id)
                .set('Authorization', 'Bearer ' + token)
                .expect(200);
        });

        let id = 0;
        it('Não deve ser possível deletar sem um token', async () => {
            const responseCreate = await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Delete',
                    email: 'testDelete@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                });
            
            id = responseCreate.body.response.id;
            const response = await request(app)
                .delete( '/api/users/' + id)
                .expect(401);
            expect(response.body.error).toEqual('Token not found');
        });

        it('Não deve ser possível deletar com um token inválido', async () => {
            const response = await request(app)
                .delete( '/api/users/' + id)
                .set('Authorization', 'Bearer invalid')
                .expect(401);
            expect(response.body.error).toEqual('Invalid token');
        });
       
        it('Não deve ser possível deletar um usuário com um token de um outro usuário', async () => {
            const token = jwt.sign({ idToken: 100 }, secret, options);
            const response = await request(app)
                .delete( '/api/users/' + id)
                .set('Authorization', 'Bearer ' + token)
                .expect(401);
            
            expect(response.body.error).toEqual('Unauthorized token');
        });
    });

    describe('Rota de atualizar usuário', () => {
        let id = 0;
        let token = '';
        it('Deve ser possível atualizar um usuário', async () => {
            await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Update',
                    email: 'testUpdate@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                });

            const responseLogin = await request(app)
                .post('/api/login')
                .send({
                    email: 'testUpdate@test.com',
                    password: 'test123'
                });

            id = responseLogin.body.response.id;
            token = responseLogin.body.response.token;

            const response = await request(app)
                .put('/api/users/' + id)
                .send({
                    name: 'Test Update Updated'
                })
                .set('Authorization', 'Bearer ' + token)
                .expect(200);

            expect(response.body.response.name).toEqual('Test Update Updated');
        });

        it('Não deve ser possível atualizar para um email que já foi cadastrado', async () => {
            await request(app)
                .post('/api/users')
                .send({
                    name: 'Test Update',
                    email: 'testUpdateEmail@test.com',
                    contact: '(00) 12345-6789',
                    password: 'test123'
                });

            const response = await request(app)
                .put('/api/users/' + id)
                .send({
                    email: 'testUpdateEmail@test.com'
                })
                .set('Authorization', 'Bearer ' + token)
                .expect(400);

            expect(response.body.error).toEqual('Email already exists');
        });

        it('Não deve ser possivel atualizar um usuário que não existe', async () => {
            const response = await request(app)
                .put('/api/users/999')
                .send({
                    email: 'testUpdateNofFound@test.com'
                })
                .set('Authorization', 'Bearer ' + token)
                .expect(404);

            expect(response.body.error).toEqual('No user found');
        });
    });
});
