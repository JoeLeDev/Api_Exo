const { z } = require("zod");

const orderSchema = z
  .object({
    order_date: z.string().min(1, "La date est obligatoire"),
    user_id: z.string().uuid("L'id utilisateur doit être un UUID valide"),
    product_id: z.string().uuid("L'id produit doit être un UUID valide"),
  })
  .strict();

module.exports = { orderSchema };