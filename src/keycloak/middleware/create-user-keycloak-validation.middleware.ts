import { CreateUserKeycloakDto } from './../dtos/create-user-keycloak.dto';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

@Injectable()
export class CreateUserKeycloakValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const createUserKeycloakDto = new CreateUserKeycloakDto();
    createUserKeycloakDto.email = body.username;
    createUserKeycloakDto.email = body.email;
    createUserKeycloakDto.password = body.password;
    createUserKeycloakDto.firstName = body.firstName;
    createUserKeycloakDto.lastName = body.lastName;
    createUserKeycloakDto.group = body.group;

    const validations = await validate(createUserKeycloakDto);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
