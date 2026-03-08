const express = require("express");

const createRepo = require("./product.repository");
const createService = require("./product.service");
const createController = require("./product.controller");

const validateData = require("../../core/middlewares/validateData");
const { productSchema } = require("./product.schema");

module.exports = (pool) => {
  const router = express.Router();

  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);

  /**
   * @swagger
   * tags:
   *   name: Products
   *   description: Gestion des produits
   */

  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: Récupérer tous les produits
   *     tags: [Products]
   *     responses:
   *       200:
   *         description: Liste des produits
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     example: "550e8400-e29b-41d4-a716-446655440000"
   *                   name:
   *                     type: string
   *                     example: "PC Portable"
   *                   price:
   *                     type: number
   *                     example: 1200
   *                   category:
   *                     type: string
   *                     example: "informatique"
   */
  router.get("/", controller.getAll);

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: Récupérer un produit par son id
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: UUID du produit
   *     responses:
   *       200:
   *         description: Produit trouvé
   *       404:
   *         description: Produit introuvable
   */
  router.get("/:id", controller.getOne);

  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: Créer un produit
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - price
   *               - category
   *             properties:
   *               name:
   *                 type: string
   *                 example: "MacBook"
   *               price:
   *                 type: number
   *                 example: 1999
   *               category:
   *                 type: string
   *                 example: "informatique"
   *     responses:
   *       201:
   *         description: Produit créé
   *       400:
   *         description: Données invalides
   */
  router.post("/", validateData(productSchema), controller.create);

  /**
   * @swagger
   * /api/products/{id}:
   *   put:
   *     summary: Modifier un produit
   *     tags: [Products]
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
   *               - price
   *               - category
   *             properties:
   *               name:
   *                 type: string
   *                 example: "MacBook Pro"
   *               price:
   *                 type: number
   *                 example: 2499
   *               category:
   *                 type: string
   *                 example: "informatique"
   *     responses:
   *       200:
   *         description: Produit mis à jour
   *       400:
   *         description: Données invalides
   *       404:
   *         description: Produit introuvable
   */
  router.put("/:id", validateData(productSchema), controller.update);

  /**
   * @swagger
   * /api/products/{id}:
   *   delete:
   *     summary: Supprimer un produit
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Produit supprimé
   *       404:
   *         description: Produit introuvable
   */
  router.delete("/:id", controller.remove);

  return router;
};