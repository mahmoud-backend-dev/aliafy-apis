import { body } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import BadRequest from '../../errors/badRequest.js';

export const sectionOneValidator = [
  body('title').isString().withMessage('Title required and must be a string'),
  body('description').isString().withMessage('Description required and must be a string'),
  validatorMiddleware,
];

export const sectionThreeValidator = [
  body('images')
    .custom((val, { req }) => {
      if (req.files.length === 0) {
        throw new BadRequest('Images required and must be an array');
      }
      return true
    }),
  validatorMiddleware,
];

export const addImgToSectionThreeValidator = [
  body('image').custom((val, { req }) => {
    if (req.file === undefined) {
      throw new BadRequest('Image required');
    }
    return true
  }),
  validatorMiddleware,
];

export const sectionFourValidator = [
  body('mainTitle').isString().withMessage('Main title required and must be a string'),
  validatorMiddleware,
];

export const sectionSixValidator = [
  body('title').isString().withMessage('Title required and must be a string'),
  body('image').custom((val, { req }) => {
    if (req.file === undefined) {
      throw new BadRequest('Image required');
    }
    return true
  }),
  validatorMiddleware
];