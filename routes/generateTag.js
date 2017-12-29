let express = require('express')
let router = express.Router()
let Tag = require('./../models/TagSchema')

router.post('/generateTag', function (req, res, next) {
    let form = req.body
    Tag.create(form).then(_ => {
        res.redirect('/')
    }).catch(_ => {
        res.render('error')
    })
})

module.exports = router
