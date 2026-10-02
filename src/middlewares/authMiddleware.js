const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");
function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) return res.status(401).json({ erro: "Token de autenticação não informado." });
  try {
    const payload = jwt.verify(authorization.slice(7).trim(), jwtSecret);
    req.user = { id: Number(payload.sub), email: payload.email, perfil: payload.perfil };
    next();
  } catch { res.status(401).json({ erro: "Token inválido ou expirado." }); }
}
module.exports = authMiddleware;
