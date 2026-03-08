const express = require("express");

const createRepo = require("./rating.repository");
const createService = require("./rating.service");
const createController = require("./rating.controller");

const validateData = require("../../core/middlewares/validateData");
const { ratingSchema } = require("./rating.schema");

module.exports = (pool) => {
  const router = express.Router();

  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);

  /**
   * @swagger
   * tags:
   *   name: Ratings
   *   description: Gestion des notes
   */

  /**
   * @swagger
   * /api/ratings:
   *   get:
   *     summary: Récupérer toutes les notes
   *     tags: [Ratings]
   *     responses:
   *       200:
   *         description: Liste des notes
   */
  router.get("/", controller.getAll);

  /**
   * @swagger
   * /api/ratings/{id}:
   *   get:
   *     summary: Récupérer une note par son id
   *     tags: [Ratings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note trouvée
   *       404:
   *         description: Note introuvable
   */
  router.get("/:id", controller.getOne);

  /**
   * @swagger
   * /api/ratings:
   *   post:
   *     summary: Créer une note
   *     tags: [Ratings]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - user_id
   *               - product_id
   *               - rating
   *             properties:
   *               user_id:
   *                 type: string
   *                 example: "c47275f8-b00d-4517-aece-c4e73da20677"
   *               product_id:
   *                 type: string
   *                 example: "d0f2a0d7-e399-47e2-a434-359e4aab3749"
   *               rating:
   *                 type: integer
   *                 example: 5
   *     responses:
   *       201:
   *         description: Note créée
   *       400:
   *         description: Données invalides
   */
  router.post("/", validateData(ratingSchema), controller.create);

  /**
   * @swagger
   * /api/ratings/{id}:
   *   put:
   *     summary: Modifier une note
   *     tags: [Ratings]
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
   *               - user_id
   *               - product_id
   *               - rating
   *             properties:
   *               user_id:
   *                 type: string
   *                 example: "c47275f8-b00d-4517-aece-c4e73da20677"
   *               product_id:
   *                 type: string
   *                 example: "d0f2a0d7-e399-47e2-a434-359e4aab3749"
   *               rating:
   *                 type: integer
   *                 example: 4
   *     responses:
   *       200:
   *         description: Note mise à jour
   *       404:
   *         description: Note introuvable
   */
  router.put("/:id", validateData(ratingSchema), controller.update);

  /**
   * @swagger
   * /api/ratings/{id}:
   *   delete:
   *     summary: Supprimer une note
   *     tags: [Ratings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note supprimée
   *       404:
   *         description: Note introuvable
   */
  router.delete("/:id", controller.remove);

  return router;
};