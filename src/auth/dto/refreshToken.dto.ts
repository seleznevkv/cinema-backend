import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({
    message: 'You did not pass token or it is not a string',
  })
  refreshToken: string;
}
