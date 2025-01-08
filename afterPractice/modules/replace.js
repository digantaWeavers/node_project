const templateParts = (templates, product) => {
    let data = templates.replace(/{% PRODUCT_ID %}/g, product.id);
    data = data.replace(/{% PRODUCTNAME %}/g, product.productName);
    data = data.replace(/{% PRODUCTIMAGE %}/g, product.image);
    data = data.replace(/{% PRODUCT_CATEGORY %}/g, product.category);
    data = data.replace(/{% PRODUCT_PRICE %}/g, product.price);
    data = data.replace(/{% DESCRIPTION %}/g, product.description);
    
    return data;
}

module.exports = templateParts;