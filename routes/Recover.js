const express = require("express");
const router = express.Router();
require("../models/LoginModel");
const mongoose = require("mongoose");
const LoginModel = mongoose.model("LoginModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

router.get("/", (req, res) => {
  res.render("RecoverView", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
});

router.post("/verify", async (req, res) => {
  try {
    const result = await LoginModel.find({ email: req.body.email });
    if (result.length > 0) {
      var idPass = "";
      result.forEach((resultado) => {
        idPass = resultado._id;
      });
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: "TESTE",
        text: process.env.SITE + "recover"+"/updatepass/"+idPass,
      });
      req.flash("success", "Email");
      req.session.idPass = idPass;
      res.redirect("/recover");
    } else {
      req.flash("error", "Email inexistente!");
      res.redirect("/recover");
    }
  } catch (err) {
    console.log(err);
  }
});


router.get("/updatepass/:id", (req, res) => {
  try{
    if (typeof req.session.idPass !== "undefined") {
      req.params.id = req.session.idPass
      res.render("UpdatePass")
    }else{
      res.redirect('/recover')
    }
  }catch(err){
    console.log(err)
  }
  
});

router.post("/atualizar", async (req, res) => {
  try{
    const update = {
      senha: req.body.updatePass
    }
    await LoginModel.findOneAndUpdate({_id: req.session.idPass}, update).clone()
    res.send("Atualizado!")
  }catch(err){
    console.log(err)
  }
})

module.exports = router;
