const { z } = require("zod");

const productSchema = z
  .object({
    name: z.string().min(3, "Le nom doit faire au moins 3 caractères").trim(),
    price: z.number().positive("Le prix doit être positif"),
    category: z.string().min(3, "Le nom de la catégorie doit contenir au moins trois lettres")
  })
  .strict();

module.exports = { productSchema };