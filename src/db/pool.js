const { Pool } = require("pg");
const { databaseUrl } = require("../config/env");
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});
pool.on("error", (error) => console.error("Erro inesperado no pool PostgreSQL:", error));
async function query(text, params = []) { return pool.query(text, params); }
async function withTransaction(callback) {
  const client = await pool.connect();
  try { await client.query("BEGIN"); const result = await callback(client); await client.query("COMMIT"); return result; }
  catch (error) { try { await client.query("ROLLBACK"); } catch (e) { console.error("Erro no ROLLBACK:", e); } throw error; }
  finally { client.release(); }
}
async function setAuthenticatedUser(client, userId) {
  await client.query("SELECT set_config('app.usuario_id', $1, true)", [String(userId)]);
}
module.exports = { pool, query, withTransaction, setAuthenticatedUser };
