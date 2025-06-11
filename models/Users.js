const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const schema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
      },  
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true }

}, {timestamps: true})

schema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  })

  
module.exports = mongoose.model("Users", schema, "Users")