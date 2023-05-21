const getResponse = (success, data, error) => success
    ? { data }
    : { error };

export const buildResponse = (success, data, error = undefined) => ({
    success,
    ...getResponse(success, data, error),
    timestamp: Date.now()
});

export const sendErrorResponse = (res, statusCode, error) => res.status(statusCode).json(
    buildResponse(false, {}, error)
);

export const sendSuccessResponse = (res, data, statusCode = 200) => res.status(statusCode).json(
    buildResponse(true, data)
);

export const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
