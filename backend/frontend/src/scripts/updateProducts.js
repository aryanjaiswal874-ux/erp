const fs = require('fs');
const path = require('path');

const filePath = 'd:\\Current Projects\\SBGM\\sbgm\\src\\Data\\Products.json';

try {
    const rawData = fs.readFileSync(filePath);
    const products = JSON.parse(rawData);

    const updatedProducts = products.map((product) => {
        // Generate a short description based on the service name
        let description = `Professional and reliable ${product.Service_Name} services.`;
        if (product.Service_Type) {
            description = `Expert ${product.Service_Type} solutions: ${product.Service_Name}. Quick and hassle-free processing.`;
        }

        // Generate image path based on S.No
        // The user suggested /product/1.png, /product/2.png etc. 
        // I'll use the S.No for this.
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
