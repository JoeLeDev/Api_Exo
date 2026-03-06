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

    create: async ({ name, price, category }) => {
      const id = uuidv4();

      await pool.query("INSERT INTO products (id, name, price, category) VALUES (?, ?, ?, ?)", [
        id,
        name,
        price,
        category
      ]);

      return { id, name, price, category };
    },

    updateById: async (id, { name, price, category }) => {
      const result = await pool.query(
        "UPDATE products SET name = ?, price = ?, category = ?, WHERE id = ?",
        [name, price, category, id]
      );
      return result.affectedRows > 0;
    },

    deleteById: async (id) => {
      const result = await pool.query("DELETE FROM products WHERE id = ?", [id]);
      return result.affectedRows > 0;
    },
  };
};