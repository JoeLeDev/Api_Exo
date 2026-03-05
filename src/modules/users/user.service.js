module.exports = (repo) => {
  return {    
    listUsers: async () => {
      return repo.findAll();
    },

    getUser: async (id) => {
      return repo.findById(id);
    },

    createUser: async (data) => {
      return repo.create(data);
    },

    updateUser: async (id, data) => {
      const ok = await repo.updateById(id, data);
      if (!ok) return null;
      return repo.findById(id);
    },

    deleteUser: async (id) => {
      return repo.deleteById(id);
    },
}}