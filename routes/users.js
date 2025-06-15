const express = require('express')
const Users = require('../models/Users')
const router = express.Router();

router.post("/", async (req, res) => {
    console.log('Requisição recebida:', req.body);

    try{
        const {name,lastName,email,password,role,isActive} = req.body;

        if(!name || !lastName || !email || !password){
            res.status(400).json({errorMessage: "Dados obrigatóriosfaltando."})
        };

        const registeredUser = await Users.create({name,lastName,email,password,role,isActive});
        res.status(201).json(registeredUser);
    }catch(err){
        console.error("Erro ao criar o usuário:", err);
        res.status(400).json({ message: "Erro ao criar o usuário", error: err.message });
    }
});

router.get("/", async(req, res) => {
    try{
        const foundUsers = await Users.find()
        res.status(200).json(foundUsers)
    }catch(err){
        console.error("Erro ao buscar usuários")
        res.status(400).json({message: "Erro ao buscar usuários", error: err})
    }
})


module.exports = router