import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakConfig {
  KEYCLOAK_CLIENT_ID = this.configService.get('KEYCLOAK_CLIENT_ID');
  KEYCLOAK_CLIENT_SECRET = this.configService.get('KEYCLOAK_CLIENT_SECRET');
  KEYCLOAK_GRANT_TYPE = this.configService.get('KEYCLOAK_GRANT_TYPE');
  KEYCLOAK_URL_GEN_TOKEN = this.configService.get('KEYCLOAK_URL_GEN_TOKEN');
  KEYCLOAK_PUBLIC_KEY = this.configService.get('KEYCLOAK_PUBLIC_KEY');
  KEYCLOAK_URL_CREATE_USER = this.configService.get('KEYCLOAK_URL_CREATE_USER');
  KEYCLOAK_URL = this.configService.get('KEYCLOAK_URL');
  KEYCLOAK_REALM = this.configService.get('KEYCLOAK_REALM');
  KEYCLOAK_RESPONSE_TYPE = this.configService.get('KEYCLOAK_RESPONSE_TYPE');
  KEYCLOAK_SCOPE = this.configService.get('KEYCLOAK_SCOPE');
  KEYCLOAK_REDIRECT_URI = this.configService.get('KEYCLOAK_REDIRECT_URI');
  KEYCLOAK_LOGIN_URI = this.configService.get('KEYCLOAK_LOGIN_URI');
  KEYCLOAK_URL_GEN_TOKEN_ADMIN = this.configService.get(
    'KEYCLOAK_URL_GEN_TOKEN_ADMIN',
  );
  KEYCLOAK_CLIENT_SECRET_ADMINCLI = this.configService.get(
    'KEYCLOAK_CLIENT_SECRET_ADMINCLI',
  );
  constructor(private configService: ConfigService) {}
}
