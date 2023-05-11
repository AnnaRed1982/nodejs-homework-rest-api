const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .max(30)
    .required(),
  email: Joi.string().max(15).email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .max(14)
    .regex(/\(([0-9]{3})\)( )([0-9]{3})-([0-9]{4})$/)
    .messages({
      "string.pattern.base": `Phone number must be in format:(***) ***-****`,
    })
    .required(),
});

module.exports = { addSchema };
