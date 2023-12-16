import asyncHandler from 'express-async-handler';
import SectionTwo from '../models/SectionTwo.js';
import { StatusCodes } from 'http-status-codes';
import BadRequest from '../errors/badRequest.js';

export const addSectionTwo = asyncHandler(async (req, res) => {
  const sectionTwo = await SectionTwo.create(req.body);
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    sectionTwo
  });
});

export const getSectionTwo = asyncHandler(async (req, res) => {
  const sectionTwo = await SectionTwo.find();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionTwo
  });
});

export const updateSectionTwo = asyncHandler(async (req, res) => {
  const updatedSectionTwo = await SectionTwo.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      description: req.body.description
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    updatedSectionTwo
  });
});

export const deleteSectionTwo = asyncHandler(async (req, res) => {
  await SectionTwo.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Section two deleted successfully'
  });
});

export const getSectionTwoById = asyncHandler(async (req, res) => {
  const sectionTwo = await SectionTwo.findById(req.params.id);
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionTwo
  });
});