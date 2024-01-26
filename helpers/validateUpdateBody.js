import HttpError from "./HttpError.js";

const validateUpdateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      next(HttpError(400, "Body must have at least one field"));
    }
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateUpdateBody;
