import { MAK_MembershipPlan } from "../models/index.js";

export const getMembershipPlans = async (req, res) => {
    try {
        const plans = await MAK_MembershipPlan.findAll({
            where: { is_active: true },
            order: [['level', 'ASC']]
        });
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllMembershipPlans = async (req, res) => {
    try {
        const plans = await MAK_MembershipPlan.findAll({
            order: [['level', 'ASC']]
        });
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMembershipPlan = async (req, res) => {
    try {
        const { title, price, level, description, features, color_class, bg_class, border_class } = req.body;
        const plan = await MAK_MembershipPlan.create({
            title, price, level, description, features, color_class, bg_class, border_class
        });
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMembershipPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const plan = await MAK_MembershipPlan.findByPk(id);
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        
        await plan.update(updateData);
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMembershipPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await MAK_MembershipPlan.findByPk(id);
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        
        await plan.destroy();
        res.status(200).json({ message: "Plan deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
