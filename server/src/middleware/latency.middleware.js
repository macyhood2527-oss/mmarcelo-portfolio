export function latencyMiddleware(req, res, next) {
  const start = process.hrtime.bigint();

  const originalEnd = res.end;

  res.end = function (...args) {
    // headers are still editable right before ending (most cases)
    if (!res.headersSent) {
      const end = process.hrtime.bigint();
      const ms = Number(end - start) / 1_000_000;
      res.setHeader("x-response-time-ms", String(Math.round(ms)));
    }

    return originalEnd.apply(this, args);
  };

  next();
}