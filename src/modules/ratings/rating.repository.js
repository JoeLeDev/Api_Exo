const { v4: uuidv4 } = require("uuid");

module.exports = (pool) => {
  return {
    findAll: async () => {
      return pool.query("SELECT * FROM ratings");
    },

    findById: async (id) => {
      const rows = await pool.query("SELECT * FROM ratings WHERE ratings_id = ?", [id]);
      return rows[0] || null;
    },

    create: async ({ user_id, product_id, rating }) => {
      const ratings_id = uuidv4();

      await pool.query("INSERT INTO ratings (ratings_id, user_id , product_id, rating) VALUES (?, ?, ?, ?)", [
        ratings_id,
        user_id,
        product_id,
        rating
      ]);

      return { ratings_id, user_id, product_id, rating };
    },

    updateById: async (ratings_id, { user_id, product_id, rating }) => {
      const result = await pool.query(
        "UPDATE ratings SET user_id = ?, product_id = ?, rating = ? WHERE ratings_id = ?",
        [user_id, product_id, rating, ratings_id]
      );
      return result.affectedRows > 0;
    },

    deleteById: async (id) => {
      const result = await pool.query("DELETE FROM ratings WHERE ratings_id = ?", [id]);
      return result.affectedRows > 0;
    },
  };
};