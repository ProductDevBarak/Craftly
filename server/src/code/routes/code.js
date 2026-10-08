import express from "express";
import {
  createChat,
  updateChat,
  getCode,
  saveCode,
} from "../controller/code.js";
import { requireAuth } from "../../middleware/auth.js";
import { aiLimiter } from "../../middleware/rateLimit.js";
const router = express.Router();
router.post("/create", requireAuth, aiLimiter, createChat);
router.post("/update/:id", requireAuth, aiLimiter, updateChat);
router.get("/get/:id", requireAuth, getCode);
router.post("/save/:id", requireAuth, saveCode);
export default router;
