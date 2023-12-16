import { Router } from 'express';
const router = Router();

import { allowTo } from '../controller/user.controller.js';
import protectRoute from '../middleware/authMiddleware.js';

import { uploadSingleFile } from '../middleware/uploadFileMiddleWare.js';
import {
  addExperiencePageSectionOneValidator,
} from '../utils/validators/experience.validator.js';
import {
  addExperiencePageSectionOne,
  addExperiencePageSectionTwo,
  getExperiencePage,
  getExperiencePageSectionOne,
  getExperiencePageSectionTwo
} from '../controller/experience.controller.js';

router.post(
  '/section-one',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('image', 'experience-section-one', 'image'),
  addExperiencePageSectionOneValidator,
  addExperiencePageSectionOne
);
router.get(
  '/section-one',
  protectRoute,
  allowTo('admin'),
  getExperiencePageSectionOne
);

router.post(
  '/section-two',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('image', 'experience-section-two', 'image'),
  addExperiencePageSectionOneValidator,
  addExperiencePageSectionTwo
);
router.get(
  '/section-two',
  protectRoute,
  allowTo('admin'),
  getExperiencePageSectionTwo
);

router.get(
  '/',
  protectRoute,
  allowTo('admin'),
  getExperiencePage
)

export default router;