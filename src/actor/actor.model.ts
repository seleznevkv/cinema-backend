import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ActorModel extends Base {}
//Base adds _id field

export class ActorModel extends TimeStamps {
	//TimeStamps adds fields createdAt, updatedAt

	@prop({ unique: true })
	//prop - shows that next value is a field in table
	slug: string;

	@prop()
	name: string;

	@prop()
	photo: string;
}
