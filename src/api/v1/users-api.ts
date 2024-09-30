import { UsersMiddlewares } from '@/middlewares/users-middelware';
import { UsersService } from '@/services/users-service';
import { Router } from 'express';

const usersApi = Router();
const usersService = new UsersService();
const usersMiddleware = new UsersMiddlewares();

usersApi.post('/find', usersMiddleware.findUser(), usersService.findUser);

export default usersApi;
