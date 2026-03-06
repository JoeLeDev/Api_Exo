module.exports = (repo) => {
  return {    
    listOrders: async () => {
      return repo.findAll();
    },

    getOrderById: async (id) => {
      return repo.findById(id);
    },

    createOrder: async (data) => {
      return repo.create(data);
    },

    updateOrder: async (id, data) => {
      const ok = await repo.updateById(id, data);
      if (!ok) return null;
      return repo.findById(id);
    },

    deleteOrder: async (id) => {
      return repo.deleteById(id);
    },
}}