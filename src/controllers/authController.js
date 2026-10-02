const authService = require("../services/authService");
const { isValidEmail } = require("../utils/validation");
async function login(req,res,next) {
  try {
    const { email, senha } = req.body;
    if (!isValidEmail(email) || typeof senha !== "string" || !senha.length) return res.status(400).json({ erro:"E-mail ou senha inválidos." });
    const result = await authService.login(email.trim(), senha);
    if (!result) return res.status(401).json({ erro:"E-mail ou senha inválidos." });
    res.json(result);
  } catch(e) { next(e); }
}
module.exports = { login };
