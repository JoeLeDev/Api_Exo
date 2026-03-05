const { v4: uuidv4 } = require("uuid");

module.exports = (pool) => {
  return {
    findAll: async () => {
      return pool.query("SELECT * FROM products ORDER BY name ASC");
    },

    findById: async (id) => {
      const rows = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
      return rows[0] || null;
    },

    create: async ({ name, price }) => {
      const id = uuidv4();

      await pool.query("INSERT INTO products (id, name, price, category) VALUES (?, ?, ?, ?)", [
        id,
        name,
        price,
      ]);

      return { id, name, price };
    },

    updateById: async (id, { name, price }) => {
      const result = await pool.query(
        "UPDATE products SET name = ?, price = ? WHERE id = ?",
        [name, price, id, category]
      );
      return result.affectedRows > 0;
    },

    deleteById: async (id) => {
      const result = await pool.query("DELETE FROM products WHERE id = ?", [id]);
      return result.affectedRows > 0;
    },
  };
};