const fs = require('fs');
const http = require('http');
const url = require('url');

const cardProduct = require(`${__dirname}/modules/replace`);

const templateProdListing = fs.readFileSync(`${__dirname}/template-part/template-productListing.html`, 'utf-8');
const templateProdCard = fs.readFileSync(`${__dirname}/template-part/template-productCard.html`, 'utf-8');
const templateProductSingle = fs.readFileSync(`${__dirname}/template-part/template-singleProduct.html`, 'utf-8');

const productsData = fs.readFileSync(`${__dirname}/product-data/prodData.json`, 'utf-8');
const productJsonData = JSON.parse(productsData);

const server = http.createServer((req, res) => {
    // console.log(req.url);
    const {query, pathname} = url.parse(req.url, true);
    // const pathname = req.url;

    if( pathname === '/' ){
        // res.end('Home page or product listing page running');
        res.writeHead(200, { 'Content-type' : 'text/html' });
        const proddata = productJsonData.map( es => cardProduct (templateProdCard, es)).join('');
        const listOutput = templateProdListing.replace('{%PRODUCT_CARD%}', proddata);
        res.end(listOutput);
    }else if( pathname === '/product' ){
        res.writeHead(200, { 'Content-type' : 'text/html' });
        const productID = productJsonData[query.id];
        const singleProductPutput = cardProduct(templateProductSingle, productID);
        res.end(singleProductPutput);
    }else{
        res.writeHead(400, { 'Content-type' : 'text/html' });
        res.end("<h3>Page Not Found</h3>");
    }
});


server.listen('8000', '127.0.0.1', () => {
    console.log("Server Start");
});