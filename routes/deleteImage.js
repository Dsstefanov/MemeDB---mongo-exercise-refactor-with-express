const express = require('express')
const router = express.Router()
const Image = require('./../models/ImageSchema')

/* GET users listing. */
router.get('/delete', function(req, res, next) {
    "use strict"
    let id = req.query.id
    Image.remove({_id: id})
        .then(_ => {
            res.redirect('/')
        })
        .catch(_ => {
            res.render('error')
        })
})

module.exports = router
