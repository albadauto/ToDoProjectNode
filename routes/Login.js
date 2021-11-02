const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { restart } = require('nodemon');
require('../models/LoginModel')
const LoginModel = mongoose.model('LoginModel');
f
router.get('/', (req,res) => {
    res.render('LoginView', {error: req.flash('error')})
})

router.post('/verifyLogin', async (req,res) => {
    try{
        var idUsuario = ""
        const result = await LoginModel.find({email: req.body.email, senha: req.body.senha})
        if (result.length > 0) {
            
            result.forEach((newResult) => {
                idUsuario = newResult._id
            })

            req.session.email = req.body.email
            req.session.idUser = idUsuario

            res.redirect('/atividades')
        }else{
            req.flash('error', 'Usuario ou senha incorreto!')
            res.redirect('/')
        }
    }catch(err){
        console.log(err)
    }
    

})

router.get('/RegistrarAdmin', async (req, res) => {
    try{
        const Dados = {
            email:'icarly@gmail.com', 
            senha: 'root', 
        }
        await new LoginModel(Dados).save()
        res.status(200).send({message: 'Success'})
    }catch(err){
        console.log(err)
    }
    
})


module.exports = router