const appError = (err, req, res, next) => {

  console.error("Erreur API:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Erreur serveur",
  });

};

module.exports = appError;