const { z } = require("zod");

const ratingSchema = z
  .object({
    user_id: z.string().uuid("L'id utilisateur doit être un UUID valide"),
    product_id: z.string().uuid("L'id produit doit être un UUID valide"),
    rating: z.number().int("La valeur doit être un entier")
    .min(1, "La note doit être au minimum 1")
    .max(5,"La note doit être au maximum 5")
  })
  .strict();

module.exports = { ratingSchema };