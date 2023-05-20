import { Router } from "express";

import { getQuestions, insertQuestion } from "./controllers/index.js";

const router = Router();

router.get("/", getQuestions);
router.post("/", insertQuestion);

export default router;
