import { Router } from 'express';
import usersApi from './users-api';

const api = Router();

api.use('/users/', usersApi);

export default api;
