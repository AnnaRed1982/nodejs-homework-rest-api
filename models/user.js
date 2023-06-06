const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required().messages({
    "any.required": `missing required field email`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const subscripSchema = Joi.object({
  subscription: Joi.string()
    .valid(...["starter", "pro", "business"])
    .required(),
});

const schemas = { registerSchema, loginSchema, subscripSchema, emailSchema };

const User = model("user", userSchema);

module.exports = { schemas, User };
