import { Router } from "express";
import users from "./components/Users/routes.js";
import questions from "./components/Questions/routes.js";
import answers from "./components/Answers/routes.js";
import userAnswers from "./components/UserAnswers/routes.js";

export default (app) => {
    const router = Router({ mergeParams: true });

    app.get("/healthz", (req, res) => {
        res.json({
            success: true,
            data: "Service is still alive.",
            timestamp: Date.now()
        });
    });

    router.use("/users", users);
    router.use("/questions", questions);
    router.use("/answers", answers);
    router.use("/user-answers", userAnswers);

    app.use("/", router);

    router.all("*", (req, res) => {
        return res.status(404).json({
            success: false,
            error: `Cannot find route ${req.originalUrl}`,
            timestamp: Date.now()
        })
    });
}


