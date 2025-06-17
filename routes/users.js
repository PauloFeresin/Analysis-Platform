const express = require('express')
const Users = require('../models/Users')
const authorizeRoles = require("../middlewares/roles");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Aqui é o cadastro não publico - todos podem se cadastrar, mas apenas admins podem gerenciar roles
router.post("/", authMiddleware, authorizeRoles('admin', 'user', 'read-only'), async (req, res) => {
    console.log('Requisição recebida:', req.body);

    try{
        const { name, lastName, email, password, role, isActive } = req.body;

        if(!name || !lastName || !email || !password){
            return res.status(400).json({errorMessage: "Dados obrigatóriosfaltando."})
        };

        const userExists = await Users.findOne({email});
        if(userExists){
            return res.status(409).json({errorMessage: "Email já cadastrado"})
        }

        let finalRole = 'user';
        if(role){
            if(req.user.role === 'admin'){
                finalRole = role
            } else {
                return res.status(403).json({message: "Apenas administradores podem definir o papel (role) do usuário." });
            }
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
router.get("/", authMiddleware,  async(req, res) => {
    try{
        const foundUsers = await Users.find()
        res.status(200).json(foundUsers)
    }catch(err){
        console.error("Erro ao buscar usuários")
        res.status(400).json({message: "Erro ao buscar usuários", error: err})
    }
})

router.delete("/:email", authMiddleware, authorizeRoles("admin") ,async(req,res) => {
    try{
        const {email}  = req.params
        const deletedUser = await Users.deleteOne({email})

        if(deletedUser.deleteCount == 0){
            return res.status(404).json({message: "Usuário não encontrado"})
        }


        res.status(200).json({message: "Usuário deleteado com sucesso", deletedUser})
    } catch(err){   
        res.status(400).json({message: "Erro ao deletar usuário", error: err.message})
    }
})


module.exports = router