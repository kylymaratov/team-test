import { ServerError } from '@/server/server-error';
import { NextFunction, Request, Response } from 'express';
import { users } from '@/constants/users.json';

interface FindUserTypes {
  email: string;
  number?: string;
}

export class UsersService {
  async findUser(
    req: Request<{}, {}, FindUserTypes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, number } = req.body;

      let response: FindUserTypes[] = users;

      const usersEmails = users.filter((user) => user.email === email);

      if (!usersEmails.length)
        throw new ServerError({
          message: 'User with such email does not exist',
          statusCode: 404,
        });

      response = usersEmails;

      if (number) {
        const userWithNumber = usersEmails.find(
          (user) => user.number === number,
        );

        if (!userWithNumber)
          throw new ServerError({
            message: 'user with such number does not exist',
            statusCode: 404,
          });

        response = [userWithNumber];
      }

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
