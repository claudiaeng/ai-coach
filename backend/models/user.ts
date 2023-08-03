import mongoose, { Document, Model, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  age: number
  // ... other fields ...
}

const UserSchema: Schema = new Schema({
  name: String,
  age: Number,
  // ... other fields ...
})

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema)
