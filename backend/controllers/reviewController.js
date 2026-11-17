import { Review } from "../models/index.js";

export const getAllReviews = async (req, res) => {
    try {
        const { isActive } = req.query;
        let filter = {};
        if (isActive !== undefined) {
             filter.isActive = isActive === 'true';
        }
        const reviews = await Review.findAll({
            where: filter,
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReview = async (req, res) => {
    try {
        const { name, comment, rating, photo, isActive } = req.body;
        const review = await Review.create({
            name,
            comment,
            rating,
            photo,
            isActive
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        const { name, comment, rating, photo, isActive } = req.body;
        await review.update({
            name,
            comment,
            rating,
            photo,
            isActive
        });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        await review.destroy();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
