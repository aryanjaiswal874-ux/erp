import { Setting } from "../models/index.js";

export const getMakSeo = async (req, res) => {
    try {
        const title = await Setting.findOne({ where: { key: "mak_seo_title" } });
        const description = await Setting.findOne({ where: { key: "mak_seo_description" } });
        const keywords = await Setting.findOne({ where: { key: "mak_seo_keywords" } });
        
        res.status(200).json({
            title: title ? title.value : "",
            description: description ? description.value : "",
            keywords: keywords ? keywords.value : ""
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMakSeo = async (req, res) => {
    try {
        const { title, description, keywords } = req.body;
        
        const settingsToUpdate = [
            { key: "mak_seo_title", value: title || "" },
            { key: "mak_seo_description", value: description || "" },
            { key: "mak_seo_keywords", value: keywords || "" }
        ];

        for (const s of settingsToUpdate) {
            await Setting.upsert(s);
        }

        res.status(200).json({ message: "SEO settings updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
