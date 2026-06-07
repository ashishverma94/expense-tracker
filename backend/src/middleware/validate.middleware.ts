import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    req.body = value;
    next();
  };