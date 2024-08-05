import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const usersSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

usersSchema.plugin(uniqueValidator);

const Users = mongoose.model("Users", usersSchema);

export default Users;
