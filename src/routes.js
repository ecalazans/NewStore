const express = require('express');
const routes = express.Router();
const ProductController = require('./app/controllers/ProductController');

routes.get('/', function(req, res) {
    return res.render("layout.njk");
});


routes.get('/products/create', ProductController.create) // Rota -> Pag. Create
routes.get('/products/:id/edit', ProductController.edit) // Rota -> Pag. Edit Prod

routes.post('/products', ProductController.post) // Rota -> Pag. Save Prod
routes.put('/products', ProductController.put) // Rota -> Pag. Update Prod
routes.delete('/products', ProductController.delete) // Rota -> Pag. Delet Prod

// Alias - Atalho
routes.get('/ads/create', function(req, res) {
    return res.redirect("/products/create");
});

module.exports = routes;