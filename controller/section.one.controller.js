import asyncHandler from 'express-async-handler';
import SectionOne from '../models/SectionOne.js';
import { StatusCodes } from 'http-status-codes';
import BadRequest from '../errors/badRequest.js';
import { unlink } from 'fs/promises';

export const addSectionOne = asyncHandler(async (req, res) => {
  req.body.image = `${process.env.BASE_URL}/section-one/${req.files.image[0].filename}`;
  req.body.icon = `${process.env.BASE_URL}/section-one/${req.files.icon[0].filename}`;
  const countCollection = await SectionOne.countDocuments();
  if (countCollection == 4) {
    throw new BadRequest('You can add only 4 items');
  }
  const sectionOne = await SectionOne.create(req.body);
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    sectionOne
  });
});

export const getSectionOne = asyncHandler(async (req, res) => {
  const sectionOne = await SectionOne.find();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionOne
  });
});

export const updateSectionOne = asyncHandler(async (req, res) => {

  if (req.files && req.files.image) {
    const section = await SectionOne.findById(req.params.id);
    req.body.image = `${process.env.BASE_URL}/section-one/${req.files.image[0].filename}`;
    await unlink(`./uploads/section-one/${section.image.split('/')[4]}`);
  }
  if (req.files && req.files.icon) {
    const section = await SectionOne.findById(req.params.id);
    req.body.icon = `${process.env.BASE_URL}/section-one/${req.files.icon[0].filename}`;
    await unlink(`./uploads/section-one/${section.icon.split('/')[4]}`);
  }
  const updatedSectionOne = await SectionOne.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      icon: req.body.icon
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    updatedSectionOne
  });
});

export const deleteSectionOne = asyncHandler(async (req, res) => {
  const sectionOne = await SectionOne.findById(req.params.id);
  await unlink(`./uploads/section-one/${sectionOne.image.split('/')[4]}`);
  await unlink(`./uploads/section-one/${sectionOne.icon.split('/')[4]}`);
  await SectionOne.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Section one deleted successfully'
  });
});

export const getSpecificSection = asyncHandler(async (req, res) => {
  const sectionOne = await SectionOne.findById(req.params.id);
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionOne
  });
})