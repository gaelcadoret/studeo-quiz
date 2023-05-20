import { findAll, insertOne } from "../../../../db.js";
import { sendErrorResponse, sendSuccessResponse, hasOwnProperty } from "../../../helpers/index.js";

const getUsers = async (req, res) => {
    const users = await findAll("users");
    sendSuccessResponse(res, users);
};

const isValidBody = (body) =>
    hasOwnProperty(body, "firstName")
    && hasOwnProperty(body, "lastName")
    && hasOwnProperty(body, "email")
    && hasOwnProperty(body, "pseudo");

const insertUser = async (req, res) => {
    if (!isValidBody(req.body)) return sendErrorResponse(res, 400, "Bad request");

    const { firstName, lastName, pseudo, email } = req.body;

    const insertedResult = await insertOne("users", {
        pseudo,
        email,
        lastName,
        firstName,
    });

    sendSuccessResponse(res, insertedResult);
}

export { getUsers, insertUser };
