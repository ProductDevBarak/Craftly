import express from "express";
import { createChat, updateChat, getCode } from "../controller/code.js";
const router = express.Router();
router.post("/create", createChat);
router.post("/update/:id", updateChat);
router.get("/get/:id", getCode);
export default router;
