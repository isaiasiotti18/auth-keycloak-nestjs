import { IsNotEmpty, IsString } from 'class-validator';

export class LoginKeycloakDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
