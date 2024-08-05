import mongoose from "mongoose";

const planningSchema = new mongoose.Schema({
  Jour: {
    type: String,
    required: true,
  },
  Heure: {
    type: Date,
    required: true,
  },
  Lieu: {
    type: String,
    required: true,
  },
});

const Planning = mongoose.model("Planning", planningSchema);

export default Planning;
