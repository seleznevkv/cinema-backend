import { IsEmail } from 'class-validator';

export class UpdateUserDto {
	@IsEmail()
	email: string;

	password?: string; //password not must thats why no @IsString

	isAdmin?: boolean;
}
