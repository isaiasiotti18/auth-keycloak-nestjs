import { CreateUserKeycloakValidationMiddleware } from './middleware/create-user-keycloak-validation.middleware';
import { KeycloakController } from './keycloak.controller';
import { KeycloakService } from '../keycloak/keycloak.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KeycloakConfig } from './keycloak.config';
import { LoginValidationMiddleware } from './middleware/login-validation.middleware';

@Module({
  imports: [HttpModule],
  providers: [KeycloakConfig, KeycloakService],
  controllers: [KeycloakController],
  exports: [KeycloakService],
})
export class KeycloakModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
    consumer
      .apply(CreateUserKeycloakValidationMiddleware)
      .forRoutes('new-user');
  }
}
