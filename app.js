const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const LoginRoute = require("./routes/Login");
const AtividadesRoute = require("./routes/Atividades");
const RegisterRoute = require("./routes/Registro");
const FeitoRoute = require("./routes/Feito");
const RecoverRoute = require("./routes/Recover");
const session = require("express-session");
const flash = require("connect-flash");
//CONFIG
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "ToDoApp",
    resave: true,
    saveUninitialized: true,
  })
);
//ROTAS
app.use("/", LoginRoute);
app.use("/atividades", AtividadesRoute);
app.use("/register", RegisterRoute);
app.use("/feito", FeitoRoute);
app.use("/recover", RecoverRoute);
//BANCO DE DADOS
mongoose.connect("mongodb://localhost/ToDoApp", () =>
  console.log("Tudo bem no banco !")
);
//SERVER
app.listen(port, () =>
  console.log(`RODANDO O PROJETO ${process.env.PROJECT_NAME} na porta ${port}`)
);
