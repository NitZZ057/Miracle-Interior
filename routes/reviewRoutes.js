import express from "express";
import {  submitReviewController,getReviewController } from '../controllers/reviewController.js'

const router = express.Router();

router.post('/submit-review',submitReviewController)
router.get('/get-reviews',getReviewController)

export default router