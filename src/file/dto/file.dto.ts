import { IsString } from 'class-validator';

export class FileDto {
	@IsString()
	name: string;

	@IsString()
	url: string;
}
