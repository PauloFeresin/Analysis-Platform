const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Users = require('../models/Users')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_PASS;

const user = {
    id: 1,
    name: "Paulo Feresin",
    email: 'pauo.feresin@gmail.com',
    permissions: ['admin']
};

const login = async(req,res) => {
    const {email, password} = req.body;
    const passwordStr = String(password);

    try{
        const user = await Users.findOne({email});
        if(!user){
            return res.status(401).json({message: "Usuário não encontrado."})
        }

        const isMatch = await bcrypt.compare(passwordStr, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Senha incorreta."})
        }

        // Cria o payload do token
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        }

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1h" // Variavel
        });

        return res.status(200).json({
            message: "Login realizado com sucesso.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    }catch(err){
        console.error("Erro ao fazer login", err);
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

module.exports = {login}