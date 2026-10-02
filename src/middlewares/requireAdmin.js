function requireAdmin(req, res, next) {
  if (!req.user || req.user.perfil !== "admin") return res.status(403).json({ erro: "Acesso permitido somente para administradores." });
  next();
}
module.exports = requireAdmin;
