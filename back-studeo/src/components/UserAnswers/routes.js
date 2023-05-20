import { Router } from "express";

import { getUserResponseByQuestionId, insertUserResponse } from "./controllers/index.js";

const router = Router();


router.get("/:userId/:questionId", getUserResponseByQuestionId);
router.post("/:questionId", insertUserResponse);

export default router;
