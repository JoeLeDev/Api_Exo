module.exports = (service) => {
  return {
    getAll: async (req, res) => {
      try {
        const orders = await service.listOrders();
        return res.status(200).json(orders);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    getOne: async (req, res) => {
      try {
        const id = req.params.id; // UUID => string que l'on met dans l'url
        const order = await service.getOrderById(id);

        if (!order) {
          return res.status(404).json({ error: "Produit introuvable" });
        }

        return res.status(200).json(order);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const created = await service.createOrder(req.body);
        return res.status(201).json(created);
      } catch (err) {
        return res.status(500).json({ error: "Erreur serveur", details: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const id = req.params.id;
        const updated = await service.updateOrder(id, req.body);

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
        const ok = await service.deleteOrder(id);

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