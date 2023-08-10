import express from "express";
import {
    registerController,
    signInController,
}
from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register',registerController);
router.post('/sign-in',signInController);

export default router