import { Router } from "express";
import { getRecentAudit } from "../controllers/audit.controller.js";

const router = Router();
router.get("/audit/recent", getRecentAudit);
export default router;