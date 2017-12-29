let express = require('express')
let router = express.Router()
let Tag = require('./../models/TagSchema')

/* GET home page. */
router.get('/', function(req, res, next) {
    Tag.find({}).select('tagName').then(tags => {
        res.render('index', {tags: tags})
    }).catch(_ => {
        res.render('error')
    })
})

module.exports = router
