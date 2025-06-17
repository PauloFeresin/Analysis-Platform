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
    role: { type: String, enum: ['user', 'admin', 'read-only'], default: 'user' },
    isActive: { type: Boolean, default: true }

}, {timestamps: true})

schema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  })

  
module.exports = mongoose.model("Users", schema, "Users")