const mongoose = require('mongoose');

const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  profilePic: {type: String, default: null},
},
{timestamps: true}
);

// Hash Password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare passwords

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password) 
}

module.exports = mongoose.model("User", UserSchema)