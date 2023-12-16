import { Router } from 'express';
const router = Router();

import { loginValidator } from '../utils/validators/user.validator.js';
import {
  login,
  signup
} from '../controller/user.controller.js';



router.post('/signup', signup);
router.post('/login', loginValidator, login);


export default router;