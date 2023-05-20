import { findAll, insertOne, find } from "../../../../db.js";
import { sendErrorResponse, sendSuccessResponse, hasOwnProperty } from "../../../helpers/index.js";



const isValidParams = (params) => hasOwnProperty(params, "questionId");

const getAnswersByQuestionId = async (req, res) => {
    if (!isValidParams(req.params)) return sendErrorResponse(res, 400, "Bad request");

    const { questionId } = req.params;

    const users = await find("answers", {
        questionId,
    });

    sendSuccessResponse(res, users);
};

const isValidBody = (body) =>
    hasOwnProperty(body, "answer")
    && hasOwnProperty(body, "questionId");

const insertAnswer = async (req, res) => {
    if (!isValidBody(req.body)) return sendErrorResponse(res, 400, "Bad request");

    const { answer, questionId } = req.body;

    const insertedResult = await insertOne("answers", {
        answer,
        questionId,
    });

    sendSuccessResponse(res, insertedResult);
}

export { getAnswersByQuestionId, insertAnswer };
