const express = require('express');
const router = express.Router();
require('../models/LoginModel')
const mongoose = require('mongoose');
const LoginModel = mongoose.model('LoginModel');

router.get('/', (req,res) => {
    res.render('Registro', {success: req.flash('success')})
})

router.post('/registerMan', async (req,res) => {
    try{
        const insert = {
            email: req.body.email,
            senha:req.body.senha,
            instituicao: req.body.instituicao
        }

        await new LoginModel(insert).save()
        req.flash('success', 'Você foi registrado no sistema! Agora, fique a vontade para logar')
        res.redirect('/register')
    }catch(err){
        console.log(err)
    }
    


})


module.exports = router