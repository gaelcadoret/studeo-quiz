import { findAll, insertOne, find } from "../../../../db.js";
import { sendErrorResponse, sendSuccessResponse, hasOwnProperty } from "../../../helpers/index.js";

const enrichQuestion = async (question) => {
    const responses = await find("answers", {
        questionId: String(question._id),
    });

    return {
        ...question,
        responses,
    }
}

const enrichQuestionsWithResponses = async (questions) => Promise.all(questions.map(enrichQuestion));

const removeAnswerId = ({ answerId, ...obj }) => ({ ...obj });

const removeQuestionsAnswerIds = (questions) => questions.map(removeAnswerId);

const getQuestions = async (req, res) => {
    const questions = await findAll("questions");

    const questionsWithResponses = await enrichQuestionsWithResponses(questions);
    const questionsWithResponsesOnly = removeQuestionsAnswerIds(questionsWithResponses);

    sendSuccessResponse(res, questionsWithResponsesOnly);
};

const isValidBody = (body) =>
    hasOwnProperty(body, "question");

const insertQuestion = async (req, res) => {
    if (!isValidBody(req.body)) return sendErrorResponse(res, 400, "Bad request");

    const { question } = req.body;

    const insertedResult = await insertOne("questions", {
        question,
    });

    sendSuccessResponse(res, insertedResult);
}

export { getQuestions, insertQuestion };
