import { Router } from 'express';
const router = Router();

import { allowTo } from '../controller/user.controller.js';
import protectRoute from '../middleware/authMiddleware.js';
import {
  addSectionTwoValidator,
  updateSectionTwoValidator
} from '../utils/validators/section.two.validator.js';
import {
  addSectionTwo,
  deleteSectionTwo,
  getSectionTwo,
  getSectionTwoById,
  updateSectionTwo
} from '../controller/section.two.controller.js';

router.post(
  '/',
  protectRoute,
  allowTo('admin'),
  addSectionTwoValidator,
  addSectionTwo
);
router.get('/', protectRoute, allowTo('admin'), getSectionTwo);
router.patch(
  '/:id',
  protectRoute,
  allowTo('admin'),
  updateSectionTwoValidator,
  updateSectionTwo
);
router.delete(
  '/:id',
  protectRoute,
  allowTo('admin'),
  updateSectionTwoValidator,
  deleteSectionTwo
);
router.get(
  '/:id',
  protectRoute,
  allowTo('admin'),
  updateSectionTwoValidator,
  getSectionTwoById
);


export default router;