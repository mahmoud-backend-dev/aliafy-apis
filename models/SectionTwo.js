import { Schema, model } from 'mongoose';

const sectionTwo = new Schema({
  date: {
    type: Number,
    required: [true, 'Date is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
}, { timestamps: true });

sectionTwo.pre(/^find/, function (next) {
  this.select('-__v -createdAt -updatedAt');
  next();
});

export default model('SectionTwo', sectionTwo);