import asyncHandler from 'express-async-handler';
import ExperiencePage from '../models/ExperiencePage.js';
import { StatusCodes } from 'http-status-codes';
import BadRequest from '../errors/badRequest.js';
import { unlink } from 'fs/promises';

export const addExperiencePageSectionOne = asyncHandler(async (req, res) => {
  let experiencePage = await ExperiencePage.findOne({});
  if (!experiencePage) {
    req.body.image = `${process.env.BASE_URL}/experience-section-one/${req.file.filename}`;
    experiencePage = await ExperiencePage.create({ sectionOne: req.body });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      experienceOne: experiencePage.sectionOne
    });
  }
  req.body.image = `${process.env.BASE_URL}/experience-section-one/${req.file.filename}`;
  if (experiencePage.sectionOne?.image) {
    await unlink(`./uploads/experience-section-one/${experiencePage.sectionOne.image.split('/')[4]}`);
  }
  experiencePage.sectionOne = req.body;
  await experiencePage.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    experienceOne: experiencePage.sectionOne
  });
});

export const getExperiencePageSectionOne = asyncHandler(async (req, res) => {
  const experiencePage = await ExperiencePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionOne: experiencePage?.sectionOne ?? null
  });
});

export const addExperiencePageSectionTwo = asyncHandler(async (req, res) => {
  let experiencePage = await ExperiencePage.findOne({});
  if (!experiencePage) {
    req.body.image = `${process.env.BASE_URL}/experience-section-two/${req.file.filename}`;
    experiencePage = await ExperiencePage.create({ sectionTwo: req.body });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      experienceTwo: experiencePage.sectionTwo
    });
  }
  req.body.image = `${process.env.BASE_URL}/experience-section-two/${req.file.filename}`;
  if (experiencePage.sectionTwo?.image) {
    await unlink(`./uploads/experience-section-two/${experiencePage.sectionTwo.image.split('/')[4]}`);
  }
  experiencePage.sectionTwo = req.body;
  await experiencePage.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    experienceTwo: experiencePage.sectionTwo
  });
});

export const getExperiencePageSectionTwo = asyncHandler(async (req, res) => {
  const experiencePage = await ExperiencePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionTwo: experiencePage?.sectionTwo ?? null
  });
});

export const getExperiencePage = asyncHandler(async (req, res) => {
  const experiencePage = await ExperiencePage.findOne({}).select('-_id -__v');
  res.status(StatusCodes.OK).json({
    status: 'success',
    experiencePage: experiencePage ?? null
  });
})
