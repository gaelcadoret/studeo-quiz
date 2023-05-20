import jwt from "jsonwebtoken";
import { find } from "../../../../db.js";
import { JWT_SECRET } from "../../../../config/env.js";
import { sendErrorResponse, sendSuccessResponse } from "../../../helpers/index.js";

const findUserByEmail = async (email) => find("users", { email })
const isValidLoginPayload = (email, password) => email && password;
const isValidLoginRequest = (user, password) => user?.password === password;

const createUserToken = (user, jwtSecret) => jwt.sign({
    userId: user.id,
    userData: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    },
    role: user.role,
}, jwtSecret);

const logUser = (req) => new Promise(async (resolve, reject) => {
    const { email, password } = req.body;

    if (!isValidLoginPayload(email, password)) return reject({error: "Bad request!", statusCode: 400});

    try {
        const user = await findUserByEmail(email);

        if (!user || !isValidLoginRequest(user, password)) return reject({error: "Access forbidden!", statusCode: 401});

        resolve(createUserToken(user, JWT_SECRET));
    } catch (e) {
        console.log("ERROR", e.message);
        reject({error: "Access forbidden!", statusCode: 401})
    }
});

const sendToken = (res) => (token) => sendSuccessResponse(res, { token });
const sendError = (res) => (response) => sendErrorResponse(res, response.statusCode, response.error);

export default async (req, res) =>
    logUser(req)
        .then(sendToken(res))
        .catch(sendError(res));
