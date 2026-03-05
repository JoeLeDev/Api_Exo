module.exports = (service) => {
  return {
    getAll: async (req, res) => {
      try {
        const products = await service.listProducts();
        return res.status(200).json(products);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    getOne: async (req, res) => {
      try {
        const id = req.params.id; // UUID => string que l'on met dans l'url
        const product = await service.getProductById(id);

        if (!product) {
          return res.status(404).json({ error: "Produit introuvable" });
        }

        return res.status(200).json(product);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const created = await service.createProduct(req.body);
        return res.status(201).json(created);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const id = req.params.id;
        const updated = await service.updateProduct(id, req.body);

        if (!updated) {
          return res.status(404).json({ error: "Produit introuvable" });
        }

        return res.status(200).json(updated);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    remove: async (req, res) => {
      try {
        const id = req.params.id;
        const ok = await service.deleteProduct(id);

        if (!ok) {
          return res.status(404).json({ error: "Produit introuvable" });
        }

        return res.status(200).json({ message: "Produit supprimé" });
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    }
  }
}