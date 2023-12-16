import { Router } from 'express';

import { allowTo } from '../controller/user.controller.js';
import protectRoute from '../middleware/authMiddleware.js';

import {
  addImgToSectionThreeValidator,
  sectionFourValidator,
  sectionOneValidator,
  sectionSixValidator,
  sectionThreeValidator,
} from '../utils/validators/home.validator.js'

import {
  addSectionOne,
  getSectionOne,
  addSectionTwo,
  getSectionTwo,
  addSectionThree,
  getSectionThree,
  addImgToSectionThree,
  deleteImgFromSectionThree,
  addSectionFour,
  addToSectionFour,
  deleteFromSectionFour,
  getSectionFour,
  addSectionFive,
  addToSectionFive,
  deleteFromSectionFive,
  getSectionFive,
  getHomepage,
  addSectionSix,
  getSectionSix
} from '../controller/home.controller.js';

import {
  uploadArrayOfFiles, uploadSingleFile
} from '../middleware/uploadFileMiddleWare.js'

const router = Router();

router.post('/section-one', protectRoute, allowTo('admin'), sectionOneValidator, addSectionOne);
router.get('/section-one', protectRoute, allowTo('admin'), getSectionOne);

router.post('/section-two', protectRoute, allowTo('admin'), sectionOneValidator, addSectionTwo);
router.get('/section-two', protectRoute, allowTo('admin'), getSectionTwo);

router.post(
  '/section-three',
  protectRoute,
  allowTo('admin'),
  uploadArrayOfFiles('images', 'section-three', 'image'),
  sectionThreeValidator,
  addSectionThree,
);
router.get('/section-three', protectRoute, allowTo('admin'), getSectionThree);
router.post(
  '/section-three/image',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('image', 'section-three', 'image'),
  addImgToSectionThreeValidator,
  addImgToSectionThree
);
router.patch(
  '/section-three/image',
  protectRoute,
  allowTo('admin'),
  deleteImgFromSectionThree
);
router.post(
  '/section-four',
  protectRoute,
  allowTo('admin'),
  uploadArrayOfFiles('images', 'section-four', 'image'),
  sectionFourValidator,
  addSectionFour
);
router.post(
  '/section-four/one',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('image', 'section-four', 'image'),
  addToSectionFour
);
router.delete(
  '/section-four/one/:id',
  protectRoute,
  allowTo('admin'),
  deleteFromSectionFour,
);
router.get('/section-four', protectRoute, allowTo('admin'), getSectionFour);

router.post(
  '/section-five',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('image', 'section-five', 'image'),
  sectionFourValidator,
  addSectionFive
);
router.post(
  '/section-five/one',
  protectRoute,
  allowTo('admin'),
  addToSectionFive,
);
router.delete(
  '/section-five/one/:id',
  protectRoute,
  allowTo('admin'),
  deleteFromSectionFive,
);
router.get('/section-five', protectRoute, allowTo('admin'), getSectionFive);

router.post(
  '/section-six',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('image', 'section-six', 'image'),
  sectionSixValidator,
  addSectionSix
)
router.get(
  '/section-six',
  protectRoute,
  allowTo('admin'),
  getSectionSix
);

router.get(
  '/',
  getHomepage
)
export default router;