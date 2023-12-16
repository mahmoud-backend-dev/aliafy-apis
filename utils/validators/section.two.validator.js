import {
  body, param
} from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";
import SectionTwo from "../../models/SectionTwo.js";
import BadRequest from "../../errors/badRequest.js";


export const addSectionTwoValidator = [
  body('date').isNumeric().withMessage('Date must be a number'),
  body('description').isString().withMessage('Description must be a string'),
  validatorMiddleware,
];

export const updateSectionTwoValidator = [
  param('id').isMongoId().withMessage('Invalid mongoId')
    .custom(async (value, { req }) => {
      const sectionTwo = await SectionTwo.findById(req.params.id);
      if (!sectionTwo) {
        throw new BadRequest('Section two not found');
      }
      return true;
    }),
  validatorMiddleware,
];