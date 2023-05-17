const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const Regex = /^\(([0-9]{3})\)( )([0-9]{3})-([0-9]{4})$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: Regex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().max(15).email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .max(14)
    .regex(/^\(([0-9]{3})\)( )([0-9]{3})-([0-9]{4})$/)
    .messages({
      "string.pattern.base": `Phone number must be in format:(***) ***-****`,
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemas = { addSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
