const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AtividadeModel = new Schema({
    nome:{
        type:String
    },
    dataCreated:{
        type:Date,
        default:Date.now,
    },
    situacao:{
        type:Boolean,
        default:false,
    },
    nomeInstituicao:{
        type:String
    },
    descricao:{
        type:String
    },
    idUser:{
        type:String
    }

})

mongoose.model('Atividade', AtividadeModel)