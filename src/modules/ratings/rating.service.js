module.exports = (repo) => {
  return {    
    listRatings: async () => {
      return repo.findAll();
    },

    getRatingById: async (id) => {
      return repo.findById(id);
    },

    createRating: async (data) => {
      return repo.create(data);
    },

    updateRating: async (id, data) => {
      const ok = await repo.updateById(id, data);
      if (!ok) return null;
      return repo.findById(id);
    },

    deleteRating: async (id) => {
      return repo.deleteById(id);
    },
}}