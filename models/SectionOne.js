import { Schema, model } from 'mongoose';

const sectionOne = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  icon: {
    type: String,
    required: [true, 'Icon is required']
  },
},{timestamps: true});

sectionOne.pre(/^find/, function (next) {
  this.select('-__v -createdAt -updatedAt');
  next();
});

export default model('SectionOne', sectionOne);