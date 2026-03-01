import crypto from "crypto";

export function requestIdMiddleware(req, res, next) {
  const id = crypto.randomUUID();
  req.id = id;
  res.setHeader("x-request-id", id);
  next();
}