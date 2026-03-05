const port = 3000
const mariadb = require("mariadb");
const createApp = require("./app");


require("dotenv").config(); // Appel variables d'environnement

const pool = mariadb.createPool({ // Init connexion à la db
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    allowPublicKeyRetrieval: true
});

pool.getConnection() // Test connnexion
  .then(conn => conn.query("SELECT DATABASE() AS db").then(r => {
    console.log(`DB connectée à ${process.env.DB_NAME}`);
    conn.release();
  }))
  .catch(err => console.error("Erreur DB:", err));


  const app = createApp(pool);

app.listen(port, () => {console.log(`Serveur démarré sur http://localhost:${port}`)})