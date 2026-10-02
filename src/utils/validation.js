function isValidEmail(email) { return typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function requireString(value, field, maxLength = 255) {
  if (typeof value !== "string" || value.trim().length === 0) { const e = new Error(`Campo '${field}' é obrigatório.`); e.status=400; e.publicMessage=e.message; throw e; }
  if (value.trim().length > maxLength) { const e = new Error(`Campo '${field}' excede o tamanho permitido.`); e.status=400; e.publicMessage=e.message; throw e; }
  return value.trim();
}
module.exports = { isValidEmail, requireString };
