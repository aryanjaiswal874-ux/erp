import { Product } from '../models/index.js';

export const getSitemap = async (req, res) => {
    try {
        // Use environment variable or default to the production domain
        const baseUrl = process.env.FRONTEND_URL || 'https://sbgmdigital.com';

        // Static Routes
        const staticRoutes = [
            '',
            '/about',
            '/services',
            '/products',
            '/contact',
            '/career',
            '/shipping-delivery',
            '/terms-conditions',
            '/privacy-policy',
            '/return-refund',
            '/cancellation-policy',
            '/corporate-information',
            '/auth/login',
            '/auth/signup'
        ];

        // Fetch Dynamic Data (Products)
        const products = await Product.findAll({
            where: { isActive: true },
            attributes: ['id', 'updatedAt']
        });

        let xml = '<?xml version="1.0" encoding="UTF-8"?>';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Add Static Routes
        staticRoutes.forEach(route => {
            xml += `
    <url>
        <loc>${baseUrl}${route}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        });

        // Add Product Routes
        products.forEach(product => {
            xml += `
    <url>
        <loc>${baseUrl}/products/${product.id}</loc>
        <lastmod>${new Date(product.updatedAt).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>`;
        });

        xml += '</urlset>';

        res.header('Content-Type', 'application/xml');
        res.send(xml);

    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).send('Error generating sitemap');
    }
};
