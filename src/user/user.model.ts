import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}
//Base adds _id field

export class UserModel extends TimeStamps {
  //TimeStamps adds fields createdAt, updatedAt

  @prop({ unique: true })
  //prop - shows that next value is a field in table
  email: string;

  @prop()
  password: string;

  @prop({ default: false })
  isAdmin?: boolean;

  @prop({ default: [] })
  favorites?: [];
}
