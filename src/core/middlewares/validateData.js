const { ZodError } = require("zod");

const validateData = (schema) => {
  return (req, res, next) => {
    try {
      // validation du body avec Zod
      req.body = schema.parse(req.body);

      // si tout est OK on passe au controller
      return next();
    } catch (err) {

      // erreur de validation Zod
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Données invalides",
          details: err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
          }))
        });
      }

      // erreur inattendue
      console.error("Erreur validation middleware:", err);

      return res.status(500).json({
        error: "Erreur serveur"
      });
    }
  };
};

module.exports = validateData;