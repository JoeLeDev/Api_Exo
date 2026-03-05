const { v4: uuidv4 } = require("uuid");

module.exports = (pool) => {
    return {
     findAll: async () => {
      return pool.query("SELECT * FROM users ORDER BY name ASC");
    },

    findById: async (id) => {
      const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0] || null;
    },

    create: async ({ name, mail }) => {
      const id = uuidv4();

      await pool.query("INSERT INTO users (id, name, mail) VALUES (?, ?, ?)", [
        id,
        name,
        mail,
      ]);

      return { id, name, mail };
    },

    updateById: async (id, { name, mail }) => {
      const result = await pool.query(
        "UPDATE users SET name = ?, mail = ? WHERE id = ?",
        [name, mail, id]
      );
      return result.affectedRows > 0;
    },

    deleteById: async (id) => {
      const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows > 0;
    },
}
}