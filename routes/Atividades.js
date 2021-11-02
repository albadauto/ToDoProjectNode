const express = require('express');
const router = express.Router();
require('../models/AtividadeModel')
const mongoose = require('mongoose');
const AtividadeModel = mongoose.model('Atividade');

router.get('/', async (req,res) => {
    const result = await AtividadeModel.find({idUser:req.session.idUser})
    res.render("AtividadeView", {success: req.flash('success'), result: result, session:req.session.idUser})
})

router.post('/cadastraAtividade', async (req, res) => {
    try{
        const insert = {
            nome: req.body.nome,
            situacao: req.body.situacao,
            nomeInstituicao: req.body.instituicao,
            idUser: req.session.idUser,
            descricao: req.body.descricao
        }

        await new AtividadeModel(insert).save();
        req.flash('success', 'Cadastrado com sucesso!')
        res.redirect('/atividades')
    }catch(err){
        console.log(err)
    }
    
})

router.post('/updateAtividades', async (req,res) => {
    try{
        const update = {
            situacao: req.body.situacaoHD,
        }
        await AtividadeModel.findOneAndUpdate({_id: req.body.idativHD}, update).clone()
        res.redirect('/atividades')
    }catch(err){
        console.log(err)
    }
})



module.exports = router