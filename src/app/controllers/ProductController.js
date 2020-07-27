const { formatPrice, cleanPrice } = require('../../lib/utils')

const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')

module.exports = {
    create(req, res) {
        // Pegar Categorias|Listar - Utilizando Promisses
        Category.all()
        .then(function(results) {

            const categories = results.rows

            return res.render("products/create.njk", { categories })
        }).catch(function(err) {
            throw new Error(err)
        })
    },
    async post(req, res) {
        //Lógica de (Salvar) - Utilizando Async Await
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        if (req.files.length == 0) {
            return res.send('Please, send at least one image')


        }

        //Pedido ao banco de dados
        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        results = await Category.all()
        const categories = results.rows

        //Criando array de promessas sem executá-las
        const filesPromise = req.files.map(file => 
            File.create({ ...file, product_id: productId })
        )
        await Promise.all(filesPromise)

        return res.redirect(`/products/${productId}/edit`, {categories})
    },
    async edit(req, res) {
        // Pedido ao banco de dados
        let results = await Product.find(req.params.id)
        const product = results.rows[0]
        // console.log(product)

        // Identificando campos preenchidos da página
        if (!product) return res.send("Product not found!!!")

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)
        
        // Pedido ao banco de dados
        results = await Category.all()
        const categories = results.rows

        return res.render("products/edit.njk", { product, categories })
    },
    async put(req, res) {
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        req.body.price = cleanPrice(req.body.price)

        if(req.body.old_price != req.body.price) {
            const oldProduct = await Product.find(req.body.id)

            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect(`/products/${req.body.id}/edit`)
    },
    async delete(req, res) {
        await Product.delete(req.body.id)

        return res.send('Product deleted')
    }
}