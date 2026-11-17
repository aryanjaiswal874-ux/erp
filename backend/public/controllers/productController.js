import { Op } from "sequelize";
import { Product, ServiceGroup, ProductType } from "../models/index.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const { keyword, groupId, typeId } = req.query;
        let where = { is_active: true };

        if (keyword) {
            where.title = { [Op.like]: `%${keyword}%` };
        }
        if (groupId) {
            where.serviceGroupId = groupId;
        }
        if (typeId) {
            where.productTypeId = typeId;
        }

        const products = await Product.findAll({
            where,
            include: [
                { model: ServiceGroup, attributes: ["name"] },
                { model: ProductType, attributes: ["name"] },
            ],
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: ServiceGroup, attributes: ["name"] },
                { model: ProductType, attributes: ["name"] },
            ],
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        console.log("[Product] Creating new product:", req.body.title);
        const body = { ...req.body };
        if (req.file) {
            body.image = `/uploads/${req.file.filename}`;
        }

        // Handle JSON fields if sent via FormData
        if (typeof body.documents_required === 'string') {
            try { body.documents_required = JSON.parse(body.documents_required); } catch (e) { body.documents_required = []; }
        }
        if (typeof body.youtube_links === 'string') {
            try { body.youtube_links = JSON.parse(body.youtube_links); } catch (e) { body.youtube_links = []; }
        }

        // Normalize booleans from FormData
        if (body.is_active === "true") body.is_active = true;
        if (body.is_active === "false") body.is_active = false;

        const product = await Product.create(body);
        console.log("[Product] Created successfully:", product.id);
        res.status(201).json(product);
    } catch (error) {
        console.error("[Product] Create Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            console.log("[Product] Updating product:", product.title);
            const body = { ...req.body };
            if (req.file) {
                body.image = `/uploads/${req.file.filename}`;
            }

            // Handle JSON fields if sent via FormData
            if (typeof body.documents_required === 'string') {
                try { body.documents_required = JSON.parse(body.documents_required); } catch (e) { }
            }
            if (typeof body.youtube_links === 'string') {
                try { body.youtube_links = JSON.parse(body.youtube_links); } catch (e) { }
            }

            // Normalize booleans
            if (body.is_active === "true") body.is_active = true;
            if (body.is_active === "false") body.is_active = false;

            await product.update(body);
            console.log("[Product] Updated successfully.");
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("[Product] Update Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            // Soft delete ideally, but user asked for delete. Sequelize has paranoid option if configured.
            // For now hard delete or set is_active false
            await product.destroy();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// --- Service Groups & Types ---

export const getServiceGroups = async (req, res) => {
    try {
        const groups = await ServiceGroup.findAll({ include: ProductType });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGroupsWithProducts = async (req, res) => {
    try {
        const groups = await ServiceGroup.findAll({
            include: [{
                model: ProductType,
                required: false,
                include: [{
                    model: Product,
                    where: { is_active: true },
                    required: false
                }]
            }],
            order: [
                ["sortOrder", "ASC"],
                ["createdAt", "ASC"], // Groups
                [ProductType, "createdAt", "ASC"], // Types
                [ProductType, Product, "createdAt", "ASC"] // Products
            ]
        });
        console.log(`[API] Hierarchical Fetch: Found ${groups.length} groups`);
        res.json(groups);
    } catch (error) {
        console.error("[API ERROR] getGroupsWithProducts:", error);
        res.status(500).json({ message: error.message });
    }
};

export const createServiceGroup = async (req, res) => {
    try {
        console.log("[Metadata] Creating service group:", req.body.name);
        const body = { ...req.body };
        if (req.file) {
            body.icon = `/uploads/${req.file.filename}`;
        }

        // Normalize boolean if exists
        if (body.isActive === "true") body.isActive = true;
        if (body.isActive === "false") body.isActive = false;

        const group = await ServiceGroup.create(body);
        console.log("[Metadata] Group created successfully.");
        res.status(201).json(group);
    } catch (error) {
        console.error("[Metadata] Group Create Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getProductTypes = async (req, res) => {
    try {
        const types = await ProductType.findAll();
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProductType = async (req, res) => {
    try {
        console.log("[Metadata] Creating product type:", req.body.name);
        const body = { ...req.body };

        // Normalize boolean
        if (body.isActive === "true") body.isActive = true;
        if (body.isActive === "false") body.isActive = false;

        const type = await ProductType.create(body);
        console.log("[Metadata] Type created successfully.");
        res.status(201).json(type);
    } catch (error) {
        console.error("[Metadata] Type Create Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateServiceGroup = async (req, res) => {
    try {
        const group = await ServiceGroup.findByPk(req.params.id);
        if (group) {
            console.log("[Metadata] Updating service group:", group.name);
            const body = { ...req.body };
            if (req.file) {
                body.icon = `/uploads/${req.file.filename}`;
            }

            // Normalize boolean if exists
            if (body.isActive === "true") body.isActive = true;
            if (body.isActive === "false") body.isActive = false;

            await group.update(body);
            console.log("[Metadata] Group updated successfully.");
            res.json(group);
        } else {
            res.status(404).json({ message: "Group not found" });
        }
    } catch (error) {
        console.error("[Metadata] Group Update Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteServiceGroup = async (req, res) => {
    try {
        const group = await ServiceGroup.findByPk(req.params.id);
        if (group) {
            await group.destroy();
            res.json({ message: "Group removed" });
        } else {
            res.status(404).json({ message: "Group not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProductType = async (req, res) => {
    try {
        const type = await ProductType.findByPk(req.params.id);
        if (type) {
            console.log("[Metadata] Updating product type:", type.name);
            const body = { ...req.body };

            // Normalize boolean
            if (body.isActive === "true") body.isActive = true;
            if (body.isActive === "false") body.isActive = false;

            await type.update(body);
            console.log("[Metadata] Type updated successfully.");
            res.json(type);
        } else {
            res.status(404).json({ message: "Type not found" });
        }
    } catch (error) {
        console.error("[Metadata] Type Update Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteProductType = async (req, res) => {
    try {
        const type = await ProductType.findByPk(req.params.id);
        if (type) {
            await type.destroy();
            res.json({ message: "Type removed" });
        } else {
            res.status(404).json({ message: "Type not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
