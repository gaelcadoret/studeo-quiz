import { Router } from "express";

import { getAnswersByQuestionId, insertAnswer } from "./controllers/index.js";

const router = Router();

router.get("/:questionId", getAnswersByQuestionId);
router.post("/", insertAnswer);

export default router;
