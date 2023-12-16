import {
  body, param
} from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";
import ExperiencePage from "../../models/ExperiencePage.js";
import BadRequest from "../../errors/badRequest.js";

export const addExperiencePageSectionOneValidator = [
  body('image').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Image is required');
    }
    return true;
  }),
  body('description').isString().withMessage('Description must be a string'),
  validatorMiddleware,
];

