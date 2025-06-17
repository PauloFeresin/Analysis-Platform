require('dotenv').config()
const mongoose = require('mongoose')
const Users = require("./models/Users")

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
    .then(async () => {
        const adminExists = await Users.findOne({ email: 'admin@admin.com' });

        if (adminExists) {
            console.log("Admin já existe");
            process.exit()
        }

        const admin = await Users.create({
            name: 'Admin',
            lastName: 'Master',
            email: 'admin@admin.com',
            password: 'senhaSecreta',
            role: 'admin',
            is_active: true
        })

        console.log('Admin criado com sucesso:');
        console.log(admin);
        process.exit();
    })
    .catch(err => {
        console.error("Erro ao criar Admin", err)
        process.exit(1)
    })