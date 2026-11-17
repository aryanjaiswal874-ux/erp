import { Blog } from "../models/index.js";
import { Op } from "sequelize";

export const getAllBlogs = async (req, res) => {
    try {
        const { isPublished, category } = req.query;
        const filter = {};
        if (isPublished !== undefined) {
            filter.isPublished = isPublished === 'true';
        }
        if (category) {
            filter.category = category;
        }

        const blogs = await Blog.findAll({
            where: filter,
            order: [["createdAt", "DESC"]]
        });

        // Map images JSON back to mediaUrls if needed by frontend
        const mappedBlogs = blogs.map(blog => {
            const blogData = blog.toJSON();
            try {
                blogData.mediaUrls = blog.images ? JSON.parse(blog.images) : (blog.mediaUrl ? [blog.mediaUrl] : []);
            } catch (e) {
                blogData.mediaUrls = blog.mediaUrl ? [blog.mediaUrl] : [];
            }
            return blogData;
        });

        res.status(200).json(mappedBlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        
        const blogData = blog.toJSON();
        try {
            blogData.mediaUrls = blog.images ? JSON.parse(blog.images) : (blog.mediaUrl ? [blog.mediaUrl] : []);
        } catch (e) {
            blogData.mediaUrls = blog.mediaUrl ? [blog.mediaUrl] : [];
        }

        res.status(200).json(blogData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, content, type, mediaUrls, author, isPublished, category } = req.body;
        const blog = await Blog.create({
            title,
            content,
            type,
            mediaUrl: mediaUrls && mediaUrls.length > 0 ? mediaUrls[0] : null,
            images: mediaUrls ? JSON.stringify(mediaUrls) : null,
            author,
            category: category || "SBGM",
            isPublished: isPublished !== undefined ? isPublished : true
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, content, type, mediaUrls, author, isPublished, category } = req.body;
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        await blog.update({
            title,
            content,
            type,
            mediaUrl: mediaUrls && mediaUrls.length > 0 ? mediaUrls[0] : null,
            images: mediaUrls ? JSON.stringify(mediaUrls) : null,
            author,
            category: category || blog.category,
            isPublished: isPublished !== undefined ? isPublished : blog.isPublished
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
