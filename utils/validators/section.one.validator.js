import {
  body, param
} from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";
import SectionOne from "../../models/SectionOne.js";
import BadRequest from "../../errors/badRequest.js";

export const addSectionOneValidator = [
  body('title').isString().withMessage('Title must be a string'),
  body('description').isString().withMessage('Description must be a string'),
  body('image').custom((value, { req }) => {
    if (!req.files.image) {
      throw new Error('Image is required');
    }
    return true;
  }),
  body('icon').custom((value, { req }) => {
    if (!req.files.icon) {
      throw new Error('Icon is required');
    }
    return true;
  }),
  validatorMiddleware,
];

export const updateSectionOneValidator = [
  param('id').isMongoId().withMessage('Invalid mongoId')
    .custom(async (value, { req }) => {
      const sectionOne = await SectionOne.findById(req.params.id);
      if (!sectionOne) {
        throw new BadRequest('Section one not found');
      }
      return true;
    }),
  validatorMiddleware,
];