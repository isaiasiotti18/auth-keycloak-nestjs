import { KeycloakService } from './keycloak.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserKeycloakDto } from './dtos/create-user-keycloak.dto';
import { LoginKeycloakDto } from './dtos/validate-login-keycloak.dto';
import { Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('keycloak')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Unprotected()
  loginKeycloak(@Body() loginKeycloakDto: LoginKeycloakDto) {
    return this.keycloakService.loginKeycloak({
      ...loginKeycloakDto,
    });
  }

  @Post('gen-token-create-user')
  @HttpCode(HttpStatus.OK)
  @Roles({ roles: ['admin'] })
  async genTokenAuthorizationToCreateUser() {
    return await this.keycloakService.genTokenAuthorizationToCreateUser();
  }

  @Post('new-user')
  @Roles({ roles: ['admin'] })
  async newUserKeycloak(@Body() createUserKeycloakDto: CreateUserKeycloakDto) {
    await this.keycloakService.createUser(createUserKeycloakDto);
  }
}
