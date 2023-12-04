const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// In asyncHnadler function, the next function passed as a parameter is the next middleware function in the middleware stack. But, the next function in the catch block is the error handler middleware function. There is no connection between these two next functions. Even the next function in the catch block will work even if we don't pass it as a parameter, but we need the next function in the parameter to call the next middleware function in the middleware stack in case of no error.

// The next in case of catch(next) is a keyword that javascript knows about. It represents the next middleware which responsible for handling errors.
export default asyncHandler;
