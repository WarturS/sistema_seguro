const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../db/pool");
const { jwtSecret, jwtExpiresIn } = require("../config/env");
async function login(email, senha) {
  const result = await query(`SELECT id, nome, email, senha_hash, perfil FROM usuarios WHERE LOWER(email)=LOWER($1) LIMIT 1`, [email]);
  if (!result.rowCount) return null;
  const usuario = result.rows[0];
  if (!(await bcrypt.compare(senha, usuario.senha_hash))) return null;
  const token = jwt.sign({ sub:String(usuario.id), email:usuario.email, perfil:usuario.perfil }, jwtSecret, { expiresIn:jwtExpiresIn });
  return { token, usuario:{ id:usuario.id, nome:usuario.nome, email:usuario.email, perfil:usuario.perfil } };
}
module.exports = { login };
