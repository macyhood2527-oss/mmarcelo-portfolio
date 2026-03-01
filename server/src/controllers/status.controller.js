export function getStatus(req, res) {
  if (req.query.fail === "1") {
    return res.status(500).json({ status: "error", message: "Simulated failure" });
  }

  res.json({
    status: "ok",
    service: "portfolio-api",
    version: "v1.0.0",
    timestamp: new Date().toISOString(),
  });
}