import { Router } from 'express';
const router = Router();

import { allowTo } from '../controller/user.controller.js';
import protectRoute from '../middleware/authMiddleware.js';
import { uploadMixedOfFiles } from '../middleware/uploadFileMiddleWare.js';
import {
  addSectionOneValidator, updateSectionOneValidator
} from '../utils/validators/section.one.validator.js';
import {
  addSectionOne, deleteSectionOne, getSectionOne, updateSectionOne
} from '../controller/section.one.controller.js';

router.post(
  '/',
  protectRoute,
  allowTo('admin'),
  uploadMixedOfFiles
    (
      [
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
      ],
      'section-one',
      'image',
  ),
  addSectionOneValidator,
  addSectionOne
);
router.get('/', protectRoute, allowTo('admin'), getSectionOne);
router.patch(
  '/:id',
  protectRoute,
  allowTo('admin'),
  uploadMixedOfFiles
    (
      [
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
      ],
      'section-one',
      'image',
    ),
  updateSectionOneValidator,
  updateSectionOne
);
router.delete(
  '/:id',
  protectRoute,
  allowTo('admin'),
  updateSectionOneValidator,
  deleteSectionOne
);
router.get(
  '/:id',
  protectRoute,
  allowTo('admin'),
  updateSectionOneValidator,
  getSectionOne
);

export default router;