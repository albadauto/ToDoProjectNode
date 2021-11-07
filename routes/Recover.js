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
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: "TESTE",
        text: "Teste",
      });
      req.flash("success", "Email");
      res.redirect("/recover");
    } else {
      req.flash("error", "Email inexistente!");
      res.redirect("/recover");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
