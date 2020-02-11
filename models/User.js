const mongoose = require("mongoose");

const User = mongoose.model('User', {
   
    //mobile - primary key
    mobile : String,
    name: String,
    role: String,
    password: String,
    is_active: Boolean,
    updated_at: Date
   
})

module.exports = User;