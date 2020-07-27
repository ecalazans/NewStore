const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer')

const ProductController = require('./app/controllers/ProductController');

routes.get('/', function(req, res) {
    return res.render("layout.njk");
});


routes.get('/products/create', ProductController.create) // Rota -> Pag. Create||Listar
routes.get('/products/:id/edit', ProductController.edit) // Rota -> Pag. Edit Prod

routes.post('/products', multer.array("photos", 6), ProductController.post) // Rota -> Pag. Save Prod
routes.put('/products', multer.array("photos", 6), ProductController.put) // Rota -> Pag. Update Prod
routes.delete('/products', ProductController.delete) // Rota -> Pag. Delet Prod

// Alias - Atalho
routes.get('/ads/create', function(req, res) {
    return res.redirect("/products/create");
});

module.exports = routes;