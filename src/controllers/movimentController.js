const movimentoModel = require('../models/movimentModel');

exports.post=async(data,idUser)=>{
    return await movimentoModel.post(data, idUser);
}
exports.get=async()=>{
    return await movimentoModel.get();   
}

exports.put=async(req,res)=>{
    return await movimentoModel.put(data, idUser);
}
exports.delete=async(id)=>{
    return await movimentoModel.delete(id,idUser);
}

exports.cash=async()=>{
    return await movimentoModel.cash();
}

exports.io=async()=>{
    return await movimentoModel.io();
}

exports.anoMes=async(data)=>{
    return await movimentoModel.anoMes(data);
}

exports.anoMesMes=async(data)=>{
    return await movimentoModel.anoMesMes(data);
}

exports.mesAno=async(data)=>{
    return await movimentoModel.mesAno(data);
}