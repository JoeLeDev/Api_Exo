const express = require("express");

const createRepo = require("./user.repository");
const createService = require("./user.service");
const createController = require("./user.controller");

const validateData = require("../../core/middlewares/validateData");
const { userSchema } = require("./user.schema");

module.exports = (pool) => {
  const router = express.Router();

  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Gestion des utilisateurs
   */

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Récupérer tous les utilisateurs
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Liste des utilisateurs
   */
  router.get("/", controller.getAllUsers);

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Récupérer un utilisateur par son id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Utilisateur trouvé
   *       404:
   *         description: Utilisateur introuvable
   */
  router.get("/:id", controller.getOneUser);

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Créer un utilisateur
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - mail
   *             properties:
   *               name:
   *                 type: string
   *                 example: "JoeLeDev"
   *               mail:
   *                 type: string
   *                 example: "joe@mail.com"
   *     responses:
   *       201:
   *         description: Utilisateur créé
   *       400:
   *         description: Données invalides
   */
  router.post("/", validateData(userSchema), controller.createUser);

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Modifier un utilisateur
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - mail
   *             properties:
   *               name:
   *                 type: string
   *                 example: "JoeLeDev"
   *               mail:
   *                 type: string
   *                 example: "joe@mail.com"
   *     responses:
   *       200:
   *         description: Utilisateur mis à jour
   *       404:
   *         description: Utilisateur introuvable
   */
  router.put("/:id", validateData(userSchema), controller.updateUser);

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Supprimer un utilisateur
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Utilisateur supprimé
   *       404:
   *         description: Utilisateur introuvable
   */
  router.delete("/:id", controller.removeUser);

  return router;
};