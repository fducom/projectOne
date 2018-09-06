const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { type: String, required: true , select: false},
    isAdmin: Boolean
})

userSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        return ret
    }
})

module.exports = mongoose.model('User', userSchema);