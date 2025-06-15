const express = require('express')
const Users = require('../models/Users')
const router = express.Router();

// Aqui é o cadastro, por enquanto não precisa de autenticação
router.post("/", async (req, res) => {
    console.log('Requisição recebida:', req.body);

    try{
        const {name,lastName,email,password,role,isActive} = req.body;

        if(!name || !lastName || !email || !password){
            return res.status(400).json({errorMessage: "Dados obrigatóriosfaltando."})
        };

        const userExists = await Users.findOne({email});
        if(userExists){
            return res.status(409).json({errorMessage: "Email já cadastrado"})
        }

        const registeredUser = await Users.create({name,lastName,email,password,role,isActive});
        const userToReturn = registeredUser.toObject();
        delete userToReturn.password
        res.status(201).json(userToReturn);
    }catch(err){
        console.error("Erro ao criar o usuário:", err);
        res.status(400).json({ message: "Erro ao criar o usuário", error: err.message });
    }
});

// rota protegida com JWT
router.get("/",authMiddleware,  async(req, res) => {
    try{
        const foundUsers = await Users.find()
        res.status(200).json(foundUsers)
    }catch(err){
        console.error("Erro ao buscar usuários")
        res.status(400).json({message: "Erro ao buscar usuários", error: err})
    }
})


module.exports = router