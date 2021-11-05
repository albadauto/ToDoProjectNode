const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/AtividadeModel");
const AtividadeModel = mongoose.model("Atividade");

router.get("/", async (req, res) => {
  try {
    const result = await AtividadeModel.find({
      idUser: req.session.idUser,
      situacao: true,
    });
    res.render("FeitoView", {
      session: req.session.idUser,
      result: result,
      success: req.flash("success"),
      Title: process.env.TITLE
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/deletarFeito/:id", async (req, res) => {
  try {
    await AtividadeModel.findByIdAndDelete({ _id: req.params.id });
    req.flash("success", "Deletado com sucesso!");
    res.redirect('/Feito')
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
