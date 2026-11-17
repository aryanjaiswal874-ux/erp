import { Setting, Product, ServiceGroup } from "../models/index.js";

// @desc    Get Partner Plan Settings (Fee & Product Discounts)
// @route   GET /api/admin/partner-plans
// @access  Private/Admin
export const getPartnerPlanSettings = async (req, res) => {
    try {
        // Get Registration Fee
        let feeSetting = await Setting.findByPk('partner_registration_fee');

        // Get Products with Service Group
        const products = await Product.findAll({
            attributes: ['id', 'title', 'price', 'partner_discount'],
            include: [{
                model: ServiceGroup,
                attributes: ['name']
            }],
            order: [['title', 'ASC']]
        });

        res.json({
            registrationFee: feeSetting ? Number(feeSetting.value) : 1000,
            products: products.map(p => ({
                id: p.id,
                title: p.title,
                category: p.ServiceGroup?.name || 'General',
                price: parseFloat(p.price),
                partner_discount: p.partner_discount || 0
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Partner Plan Settings
// @route   PUT /api/admin/partner-plans
// @access  Private/Admin
export const updatePartnerPlanSettings = async (req, res) => {
    try {
        const { registrationFee, products } = req.body;

        // Update Fee
        if (registrationFee !== undefined) {
            await Setting.upsert({
                key: 'partner_registration_fee',
                value: String(registrationFee),
                description: 'One-time registration fee for partners'
            });
        }

        // Update Products using Promise.all
        if (products && Array.isArray(products)) {
            const updatePromises = products.map(p =>
                Product.update(
                    { partner_discount: p.partner_discount },
                    { where: { id: p.id } }
                )
            );
            await Promise.all(updatePromises);
        }

        res.json({ message: "Partner plan settings updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
