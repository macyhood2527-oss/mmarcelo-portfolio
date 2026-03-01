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

app.use("/api", statusRoutes);
app.use("/api", auditRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});