import express from "express";
import cors from "cors";

import statusRoutes from "./routes/status.routes.js";
import auditRoutes from "./routes/audit.routes.js";
import { requestIdMiddleware } from "./middleware/requestId.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);

// health check for Render
app.get("/healthz", (req, res) => res.status(200).send("ok"));

app.use("/api", statusRoutes);
app.use("/api", auditRoutes);

app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[api] listening on port ${PORT}`);
});
