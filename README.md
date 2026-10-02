# Sistema Seguro — Node.js + PostgreSQL/Neon + Vercel

Backend alinhado ao PostgreSQL/Neon já configurado com `sistema_app`, menor privilégio e auditoria por trigger.

## Instalação
```bash
npm install
```

Crie `.env` a partir de `.env.example` e use a conexão do Neon com a role `sistema_app`:
```text
DATABASE_URL=postgresql://sistema_app:SENHA@HOST_NEON/DB?sslmode=require
JWT_SECRET=chave-grande-e-aleatoria
JWT_EXPIRES_IN=1h
PORT=3000
CORS_ORIGIN=http://localhost:3000
```
Nunca publique `.env`.

## Teste
```bash
npm run dev
```
Depois:
```text
GET http://localhost:3000/api/health
```
O esperado é `current_user = sistema_app` e `session_user = sistema_app`.

## Criar administrador
PowerShell:
```powershell
$env:ADMIN_PASSWORD="SenhaForteParaTeste123!"
npm run seed:admin
Remove-Item Env:ADMIN_PASSWORD
```
O hash é gerado pelo bcrypt no backend.

## Login
`POST /api/auth/login`
```json
{"email":"admin@exemplo.com","senha":"SenhaForteParaTeste123!"}
```
Use o JWT retornado como `Authorization: Bearer TOKEN`.

## Rotas
- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/clientes`
- `GET /api/clientes/:id`
- `POST /api/clientes`
- `PUT /api/clientes/:id`
- `DELETE /api/clientes/:id` (admin)
- `GET /api/usuarios` (admin)
- `POST /api/usuarios` (admin)
- `PUT /api/usuarios/:id` (admin)
- `GET /api/auditoria` (admin)

## Auditoria
Nas operações de escrita, o backend abre transação e executa:
```sql
SELECT set_config('app.usuario_id', ID, true);
```
Depois executa a operação. O trigger PostgreSQL grava automaticamente em `auditoria`. Como a função usa `SECURITY DEFINER`, ela pode gravar o log mesmo sem `INSERT` direto concedido ao `sistema_app`.

## Vercel
Configure no projeto da Vercel:
`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN` e `CORS_ORIGIN`.
Não coloque secrets no código.

## Observação
O backup/restauração é uma camada do Neon/PostgreSQL e deve ser demonstrado/documentado separadamente; não é substituído pelo backend.
