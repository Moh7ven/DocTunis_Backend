import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const MembreJurysSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  dateNaissance: {
    type: String,
    required: true,
  },
});

MembreJurysSchema.plugin(uniqueValidator);

const MembreJurys = mongoose.model("MembreJurys", MembreJurysSchema);

export default MembreJurys;
