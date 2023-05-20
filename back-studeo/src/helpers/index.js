export const sendErrorResponse = (res, statusCode, error) => res.status(statusCode).json({
    success: false,
    error,
    timestamp: Date.now()
});

export const sendSuccessResponse = (res, data, statusCode = 200) => res.status(statusCode).json({
    success: true,
    data,
    timestamp: Date.now()
});

export const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
