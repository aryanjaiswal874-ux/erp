import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getServiceGroups,
    createServiceGroup,
    getProductTypes,
    createProductType,
    getGroupsWithProducts,
    updateServiceGroup,
    deleteServiceGroup,
    updateProductType,
    deleteProductType,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management (Public & Admin)
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search by name
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a product (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_name, amount, type_id]
 *             properties:
 *               product_name:
 *                 type: string
 *               amount:
 *                 type: number
 *               type_id:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 */
router.route("/").get(getProducts).post(protect, adminOnly, upload.single('image'), createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *   put:
 *     summary: Update product (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     summary: Delete product (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.route("/groups/all").get(getServiceGroups);
router.route("/hierarchical").get(getGroupsWithProducts);
router.route("/types/all").get(getProductTypes);

router
    .route("/:id")
    .get(getProductById)
    .put(protect, adminOnly, upload.single('image'), updateProduct)
    .delete(protect, adminOnly, deleteProduct);

/**
 * @swagger
 * /api/products/groups:
 *   post:
 *     summary: Create service group (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created
 */
router.route("/groups").post(protect, adminOnly, upload.single('icon'), createServiceGroup);
router.route("/groups/:id")
    .put(protect, adminOnly, upload.single('icon'), updateServiceGroup)
    .delete(protect, adminOnly, deleteServiceGroup);


/**
 * @swagger
 * /api/products/types:
 *   post:
 *     summary: Create product type (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                type_name:
 *                  type: string
 *                group_id:
 *                  type: integer
 *     responses:
 *       201:
 *         description: Type created
 */
router.route("/types").post(protect, adminOnly, createProductType);
router.route("/types/:id")
    .put(protect, adminOnly, updateProductType)
    .delete(protect, adminOnly, deleteProductType);

export default router;
