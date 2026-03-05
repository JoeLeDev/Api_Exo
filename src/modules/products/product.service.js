module.exports = (repo) => {
  return {
    listProducts: async () => {
      return repo.findAll();
    },

    getProductById: async (id) => {
      return repo.findById(id);
    },

    createProduct: async (data) => {
      return repo.create(data);
    },

    updateProduct: async (id, data) => {
      const ok = await repo.updateById(id, data);
      if (!ok) return null;
      return repo.findById(id);
    },

    deleteProduct: async (id) => {
      return repo.deleteById(id);
    },
  };
};