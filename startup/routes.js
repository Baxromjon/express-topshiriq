const express = require('express');
const errorMiddleWare = require('../middleware/error')
const customersRoute = require('../routes/customers')
const course = require('../routes/courses')
const enrollment = require('../routes/enrollment')
const user = require('../routes/user')
const auth = require('../routes/auth')
const category = require('../routes/category')

module.exports = function (app) {
    app.use(errorMiddleWare);
    app.use(express.json());    
    app.use('/api/category', category)
    app.use('/api/customers', customersRoute)
    app.use('/api/courses', course)
    app.use('/api/enrollment', enrollment)
    app.use('/api/user', user)
    app.use('/api/auth', auth)
}