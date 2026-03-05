const { z } = require("zod");

const userSchema = z
  .object({
    name: z.string().min(3, "Le nom doit faire au moins 3 caractères").trim(),
    mail: z.email("Votre adresse mail doit contenir un @" )
  })
  .strict();

module.exports = { userSchema };