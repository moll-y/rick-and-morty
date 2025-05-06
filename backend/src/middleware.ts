import { Request, Response, NextFunction } from "express";

export function middleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log("originalUrl:", req.originalUrl);
  console.log("user-agent:", req.headers["user-agent"]);
  next();
}
