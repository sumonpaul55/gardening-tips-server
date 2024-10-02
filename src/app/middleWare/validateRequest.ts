import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequest = (zodSchema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await zodSchema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export const validateRequestCookies = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    const parsedCookies = await schema.parseAsync({
      cookies: req.cookies,
    });
    req.cookies = parsedCookies.cookies;
    next();
  });
};

export default validateRequest;
