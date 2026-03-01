import { getRecentAuditItems } from "../services/audit.service.js";

export function getRecentAudit(req, res) {
  res.json({ items: getRecentAuditItems() });
}