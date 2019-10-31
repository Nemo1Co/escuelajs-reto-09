const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const storeProducts = await productService.getProducts({ tags });
      res.status(200).json(storeProducts);
    }
    catch (error) {
      console.error('Error in GET "/products =>" ', error);
      next();
    }
  });

  router.get('/products/:productId', async (req, res, next) => {
		const { productId } = req.params;
		try {
      const storeProduct = await productService.getProduct({ productId });
      if (storeProduct.length === 0) {
        res.status(404).json(storeProduct);
      }
      else {
        res.status(200).json(storeProduct);
      }
		}
		catch (error) {
      console.error('Error in GET "/products/:productId" => ', error);
      next();
		}
  });
  
  router.post('/products', async (req, res, next) => {
    const { body: product } = req;
    try {
      const createdProductId = await productService.createProduct({ product });
			res.status(201).json(createdProductId);
		}
		catch (error) {
			console.error('Error in POST "/products" => ', error);
      next();
		}
	});

	router.put('/products/:productId', async (req, res, next) => {    
    const { productId } = req.params;
    const { body: product } = req;
    try {
      const updatedProductId = await productService.updateProduct({ productId, product });
			res.status(200).json(updatedProductId);
		}
		catch (error) {
			console.error('Error in PUT "/products/:productId" => ', error);
      next();
		}
	});

	router.delete('/products/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
      const deletedProductId = await productService.deleteProduct({ productId });
      res.status(200).json(deletedProductId);
    }
    catch (error) {
      console.error('Error in DELETE "/products/:productId" => ', error);
      next();
    }
	});

  router.get('*', (req, res) => {
    res.status(404).json('Error 404');
  });
}

module.exports = platziStore;