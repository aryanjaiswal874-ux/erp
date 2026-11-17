import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../Data/Products.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);

    const updatedProducts = products.map((product) => {
        // Generate a short description based on the service name
        let description = `Professional and reliable ${product.Service_Name} services.`;
        if (product.Service_Type) {
            description = `Expert ${product.Service_Type} solutions: ${product.Service_Name}. Quick and hassle-free processing.`;
        }

        // Generate image path based on S.No
        const imagePath = `/product/${product['S.No']}.png`;

        return {
            ...product,
            Description: description,
            Image: imagePath
        };
    });

    fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 4));
    console.log('Successfully updated Products.json with Description and Image fields.');
} catch (error) {
    console.error('Error updating Products.json:', error);
}
