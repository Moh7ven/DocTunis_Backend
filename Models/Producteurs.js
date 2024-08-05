import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ProducteurSchema = new mongoose.Schema({
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

ProducteurSchema.plugin(uniqueValidator);

const Producteurs = mongoose.model("Producteurs", ProducteurSchema);

export default Producteurs; 
