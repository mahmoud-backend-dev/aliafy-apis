import { Schema, model } from 'mongoose';

const sectionOne = new Schema({
  _id: false,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
});

const sectionTwo = new Schema({
  _id: false,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
});

const sectionThree = new Schema({
  _id: false,
  images: [String]
});

const sectionFour = new Schema({
  _id: false,
  mainTitle: {
    type: String,
    required: true
  },
  sections: [{
    icon: String,
    title: String,
    description: String
  }],
});

const sectionFive = new Schema({
  _id: false,
  mainTitle: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  sections: [{
    title: String,
    description: String
  }],
});

const sectionSix = new Schema({
  _id: false,
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});

const homePageSchema = new Schema({
  sectionOne: sectionOne,
  sectionTwo: sectionTwo,
  sectionThree: sectionThree,
  sectionFour: sectionFour,
  sectionFive: sectionFive,
  sectionSix: sectionSix,
});

export default model('HomePage', homePageSchema);