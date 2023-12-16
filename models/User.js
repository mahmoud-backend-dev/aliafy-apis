import { Schema, model } from "mongoose";
import pkj from "jsonwebtoken";
const { sign } = pkj;
import bcrypt from 'bcryptjs';


const userSchema = new Schema({

  name: {
    type: String,
    required: [true, 'name required'],
    minlength: [3, 'Too short name'],
    maxlength: [30, 'Too long name'],
  },

  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, 'email must be unique']
  },

  password: {
    type: String,
    minlength: [6, 'Too short password'],
    required: [true, 'password required'],
  },

  role: {
    type: String,
    default: 'user'
  },

}, { timestamps: true });

userSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

userSchema.methods.createJWTForAuthorization = function () {
  return sign({
    userId: this._id,
  },
    process.env.JWT_SECRET,
    {
      expiresIn: '90d'
    }
  )
};



userSchema.methods.comparePass = async function (checkPass) {
  return await bcrypt.compare(checkPass, this.password);
};

userSchema.methods.hashedPass = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

export default model('User', userSchema);