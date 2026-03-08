const express = require("express");

const createRepo = require("./orders.repository");
const createService = require("./orders.service");
const createController = require("./orders.controller");

const validateData = require("../../core/middlewares/validateData");
const { orderSchema } = require("./orders.schema");

module.exports = (pool) => {
  const router = express.Router();

  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);

  /**
   * @swagger
   * tags:
   *   name: Orders
   *   description: Gestion des commandes
   */

  /**
   * @swagger
   * /api/orders:
   *   get:
   *     summary: Récupérer toutes les commandes
   *     tags: [Orders]
   *     responses:
   *       200:
   *         description: Liste des commandes
   */
  router.get("/", controller.getAll);

  /**
   * @swagger
   * /api/orders/{id}:
   *   get:
   *     summary: Récupérer une commande par son id
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: UUID de la commande
   *     responses:
   *       200:
   *         description: Commande trouvée
   *       404:
   *         description: Commande introuvable
   */
  router.get("/:id", controller.getOne);

  /**
   * @swagger
   * /api/orders:
   *   post:
   *     summary: Créer une commande
   *     tags: [Orders]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - order_date
   *               - user_id
   *               - product_id
   *             properties:
   *               order_date:
   *                 type: string
   *                 format: date
   *                 example: "2026-03-08"
   *               user_id:
   *                 type: string
   *                 example: "c47275f8-b00d-4517-aece-c4e73da20677"
   *               product_id:
   *                 type: string
   *                 example: "d0f2a0d7-e399-47e2-a434-359e4aab3749"
   *     responses:
   *       201:
   *         description: Commande créée
   *       400:
   *         description: Données invalides
   */
  router.post("/", validateData(orderSchema), controller.create);

  /**
   * @swagger
   * /api/orders/{id}:
   *   put:
   *     summary: Modifier une commande
   *     tags: [Orders]
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
   *               - order_date
   *               - user_id
   *               - product_id
   *             properties:
   *               order_date:
   *                 type: string
   *                 format: date
   *                 example: "2026-03-08"
   *               user_id:
   *                 type: string
   *                 example: "c47275f8-b00d-4517-aece-c4e73da20677"
   *               product_id:
   *                 type: string
   *                 example: "d0f2a0d7-e399-47e2-a434-359e4aab3749"
   *     responses:
   *       200:
   *         description: Commande mise à jour
   *       404:
   *         description: Commande introuvable
   */
  router.put("/:id", validateData(orderSchema), controller.update);

  /**
   * @swagger
   * /api/orders/{id}:
   *   delete:
   *     summary: Supprimer une commande
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Commande supprimée
   *       404:
   *         description: Commande introuvable
   */
  router.delete("/:id", controller.remove);

  return router;
};