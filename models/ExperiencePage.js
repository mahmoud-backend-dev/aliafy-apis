import { Schema, model } from "mongoose";

const sectionOne = new Schema({
  _id: false,
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
});

const sectionTwo = new Schema({
  _id: false,
  image: {
    type: String,
    required: [true, 'Date is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
});

const experiencePageSchema = new Schema({
  sectionOne: sectionOne,
  sectionTwo: sectionTwo,
});

export default model('ExperiencePage', experiencePageSchema);