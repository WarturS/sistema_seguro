const { query } = require("../db/pool");
async function listar(req,res,next){try{const r=await query(`SELECT id,usuario_id,operacao,tabela_afetada,registro_id,banco_usuario,detalhes,criado_em FROM auditoria ORDER BY id DESC LIMIT 200`);res.json(r.rows);}catch(e){next(e);}}
module.exports={listar};
