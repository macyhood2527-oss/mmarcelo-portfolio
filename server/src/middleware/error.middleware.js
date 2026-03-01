import { log } from "../utils/logger.js";

export function errorMiddleware(err, req, res, next) {
  const requestId = req?.id;

  log("error", "Unhandled error", {
    requestId,
    path: req.originalUrl,
    method: req.method,
    message: err?.message,
  });

  res.status(err?.statusCode || 500).json({
    status: "error",
    message: err?.publicMessage || "Internal Server Error",
    requestId,
  });
}