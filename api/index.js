require("dotenv").config();
const app = require("../src/app");
module.exports = app;
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`));
}
