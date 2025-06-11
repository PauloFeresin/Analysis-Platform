const jwt = require('jsonwebtoken')
require('dotenv').config();

const password = process.env.JWT_PASS;

const user = {
    id: 1,
    name: "Paulo Feresin",
    email: 'pauo.feresin@gmail.com',
    permissions: ['admin']
};

const token = jwt.sign(user, password)
const decoded = jwt.verify(token, password)
