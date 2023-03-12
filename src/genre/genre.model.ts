import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface GenreModel extends Base {}
//Base adds _id field

export class GenreModel extends TimeStamps {
	//TimeStamps adds fields createdAt, updatedAt

	@prop({ unique: true })
	//prop - shows that next value is a field in table
	slug: string;

	@prop()
	name: string;

	@prop()
	description: string;

	@prop()
	icon: string;
}
