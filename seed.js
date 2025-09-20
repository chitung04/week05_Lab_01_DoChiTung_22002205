require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI).then(async() => {
    console.log('Connected to db');
    await Supplier.deleteMany({});
    await Product.deleteMany({});

    const s1 = await Supplier.create({ name: 'Samsung', address: 'Seoul', phone: '012345' });
    const s2 = await Supplier.create({ name: 'Apple', address: 'Cupertino', phone: '098765' });

    await Product.create({ name: 'Galaxy A', price: 200, quantity: 50, supplierId: s1._id });
    await Product.create({ name: 'iPhone 12', price: 700, quantity: 20, supplierId: s2._id });

    console.log('Seed done');
    mongoose.connection.close();
}).catch(err => console.error(err));