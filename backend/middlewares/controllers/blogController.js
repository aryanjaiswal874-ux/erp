import { Blog } from "../models/index.js";
import { Op } from "sequelize";

export const getAllBlogs = async (req, res) => {
    try {
        const { isPublished } = req.query;
        const filter = {};
        if (isPublished !== undefined) {
            filter.isPublished = isPublished === 'true';
        }
        
        const blogs = await Blog.findAll({
            where: filter,
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, content, type, mediaUrl, author, isPublished } = req.body;
        const blog = await Blog.create({
            title,
            content,
            type,
            mediaUrl,
            author,
            isPublished
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, content, type, mediaUrl, author, isPublished } = req.body;
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        await blog.update({
            title,
            content,
            type,
            mediaUrl,
            author,
            isPublished
        });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        await blog.destroy();
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
