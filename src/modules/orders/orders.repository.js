const { v4: uuidv4 } = require("uuid");

module.exports = (pool) => {
    return {
     findAll: async () => {
      return pool.query("SELECT * FROM orders");
    },

    findById: async (id) => {
      const rows = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
      return rows[0] || null;
    },

    create: async ({ order_date, user_id, product_id }) => {
      const id = uuidv4();

      await pool.query(
        "INSERT INTO orders (id, order_date, user_id, product_id) VALUES (?, ?, ?, ?)",
        [id, order_date, user_id, product_id]
      );

      return {
        id,
        order_date,
        user_id,
        product_id,
      };
    },

    updateById: async (id, { order_date, user_id, product_id }) => {
      const result = await pool.query(
        "UPDATE orders SET order_date = ?, user_id = ?, product_id = ? WHERE id = ?",
        [order_date, user_id, product_id, id]
      );
      return result.affectedRows > 0;
    },

    deleteById: async (id) => {
      const result = await pool.query("DELETE FROM orders WHERE id = ?", [id]);
      return result.affectedRows > 0;
    },
}
}