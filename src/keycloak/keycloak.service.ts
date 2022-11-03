import { LoginKeycloakDto } from './dtos/validate-login-keycloak.dto';
import { KeycloakConfig } from './keycloak.config';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateUserKeycloakDto } from './dtos/create-user-keycloak.dto';

@Injectable()
export class KeycloakService {
  constructor(
    private keycloakConfig: KeycloakConfig,
    private httpService: HttpService,
  ) {}

  async genTokenAuthorizationToCreateUser(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        this.keycloakConfig.KEYCLOAK_URL_GEN_TOKEN_ADMIN,
        new URLSearchParams({
          client_id: 'admin-cli',
          client_secret: this.keycloakConfig.KEYCLOAK_CLIENT_SECRET_ADMINCLI,
          grant_type: 'client_credentials',
        }),
      ),
    );

    return {
      access_token: data.access_token,
    };
  }

  async createUser(createUserKeycloakDto: CreateUserKeycloakDto) {
    const { email, firstName, password, group } = createUserKeycloakDto;

    const { access_token } = await this.genTokenAuthorizationToCreateUser();

    console.log(access_token);

    return await firstValueFrom(
      this.httpService.post(
        this.keycloakConfig.KEYCLOAK_URL_CREATE_USER,
        {
          username: email,
          email,
          firstName,
          enabled: true,
          groups: [group],
          credentials: [
            {
              type: 'password',
              value: password,
              temporary: false,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
    );
  }

  async loginKeycloak({ username, password }: LoginKeycloakDto) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        this.keycloakConfig.KEYCLOAK_URL_GEN_TOKEN,
        new URLSearchParams({
          client_id: this.keycloakConfig.KEYCLOAK_CLIENT_ID,
          client_secret: this.keycloakConfig.KEYCLOAK_CLIENT_SECRET,
          grant_type: this.keycloakConfig.KEYCLOAK_GRANT_TYPE,
          username,
          password,
        }),
      ),
    );
    return data;
  }

  async refreshTokenKeycloak(refreshToken: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        this.keycloakConfig.KEYCLOAK_URL_GEN_TOKEN,
        new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: this.keycloakConfig.KEYCLOAK_CLIENT_ID,
          client_secret: this.keycloakConfig.KEYCLOAK_CLIENT_SECRET,
          refresh_token: refreshToken,
        }),
      ),
    );

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  }
}
