function isoMinutesAgo(mins) {
  return new Date(Date.now() - 1000 * 60 * mins).toISOString();
}

export function getRecentAuditItems() {
  return [
    { id: "a_1001", actor: "admin", action: "PRODUCT_CREATE", target: "SKU-1042", at: isoMinutesAgo(8) },
    { id: "a_1002", actor: "cashier", action: "SALE_CREATE", target: "INV-22018", at: isoMinutesAgo(22) },
    { id: "a_1003", actor: "admin", action: "PRICE_UPDATE", target: "SKU-0911", at: isoMinutesAgo(55) },
  ];
}