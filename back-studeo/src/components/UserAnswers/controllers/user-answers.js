import { ObjectId } from "mongodb";

import { insertOne, find, findById } from "../../../../db.js";
import { sendErrorResponse, sendSuccessResponse, hasOwnProperty } from "../../../helpers/index.js";

const isValidParams = (params) =>
    hasOwnProperty(params, "questionId");

const isValidParamsUserResponse = (params) =>
    hasOwnProperty(params, "userId")
    && hasOwnProperty(params, "questionId");

const isValidBody = (body) =>
    hasOwnProperty(body, "userId")
    && hasOwnProperty(body, "answerId");

const checkUserResponse = async (questionId, answerId) => {
    const question = await findById("questions", questionId);
    return question.answerId === answerId;
}

const enrichResponse = async (response) => {
    const isValidResponse = await checkUserResponse(response.questionId, response.answerId);

    return {
        ...response,
        isValidResponse,
    }
}

const enrichUserResponseWithResult = async (userResponses) => Promise.all(userResponses.map(enrichResponse));

const getUserResponseByQuestionId = async (req, res) => {
    if (!isValidParamsUserResponse(req.params)) return sendErrorResponse(res, 400, "Bad request");

    const { userId, questionId } = req.params;

    const userResponses = await find("user_answers", {
        userId,
        questionId,
    });

    const userResponsesWithResult = await enrichUserResponseWithResult(userResponses);


    sendSuccessResponse(res, userResponsesWithResult);
};

const insertUserResponse = async (req, res) => {
    if (!isValidBody(req.body) || !isValidParams(req.params)) return sendErrorResponse(res, 400, "Bad request");

    const { questionId } = req.params;
    const { userId, answerId } = req.body;

    const insertedResult = await insertOne("user_answers", {
        userId,
        answerId,
        questionId,
    });

    const isValidResponse = await checkUserResponse(questionId, answerId);

    sendSuccessResponse(res, {
        ...insertedResult,
        isValidResponse,
    });
}

export { insertUserResponse, getUserResponseByQuestionId };
