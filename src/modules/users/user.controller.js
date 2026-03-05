module.exports = (service) => {
    return {
    getAllUsers: async (req, res) => {
      try {
        const products = await service.listUsers();
        return res.status(200).json(products);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    getOneUser: async (req, res) => {
      try {
        const id = req.params.id; // UUID => string que l'on met dans l'url
        const product = await service.getUser(id);

        if (!product) {
          return res.status(404).json({ error: "Produit introuvable" });
        }

        return res.status(200).json(product);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    createUser: async (req, res) => {
      try {
        const created = await service.createUser(req.body);
        return res.status(201).json(created);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    updateUser: async (req, res) => {
      try {
        const id = req.params.id;
        const updated = await service.updateUser(id, req.body);

        if (!updated) {
          return res.status(404).json({ error: "Produit introuvable" });
        }

        return res.status(200).json(updated);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    removeUser: async (req, res) => {
      try {
        const id = req.params.id;
        const ok = await service.deleteUser(id);

        if (!ok) {
          return res.status(404).json({ error: "Produit introuvable" });
        }

        return res.status(200).json({ message: "Produit supprimé" });
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },
  };
};