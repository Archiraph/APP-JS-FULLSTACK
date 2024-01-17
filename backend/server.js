const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;

// Connexion à la DB
connectDB();

const app = express();

// Autorisation CORS
app.use(
  cors({
    origin: "https://app-js-fullstack.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware qui permet de traiter les données du req (request)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.route"));

// Lancer le serveur
app.listen(port, () =>
  console.log("Le serveur a démarré au port suivant " + port)
);
