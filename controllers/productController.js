const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

module.exports = {
    index: async(req, res, next) => {
        try {
            const products = await Product.find().populate('supplierId').sort('-createdAt');
            res.render('products/index', { products });
        } catch (err) { next(err); }
    },

    newForm: async(req, res, next) => {
        try {
            const suppliers = await Supplier.find().sort('name');
            res.render('products/new', { suppliers });
        } catch (err) { next(err); }
    },

    create: async(req, res, next) => {
        try {
            await Product.create(req.body);
            res.redirect('/products');
        } catch (err) { next(err); }
    },

    show: async(req, res, next) => {
        try {
            const product = await Product.findById(req.params.id).populate('supplierId');
            if (!product) return res.status(404).send('Not found');
            res.render('products/show', { product });
        } catch (err) { next(err); }
    },

    editForm: async(req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            const suppliers = await Supplier.find().sort('name');
            if (!product) return res.status(404).send('Not found');
            res.render('products/edit', { product, suppliers });
        } catch (err) { next(err); }
    },

    update: async(req, res, next) => {
        try {
            await Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
            res.redirect('/products');
        } catch (err) { next(err); }
    },

    delete: async(req, res, next) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.redirect('/products');
        } catch (err) { next(err); }
    }
};