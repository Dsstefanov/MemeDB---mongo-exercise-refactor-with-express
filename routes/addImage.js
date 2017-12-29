let express = require('express')
let router = express.Router()
let Image = require('./../models/ImageSchema')
let Tag = require('./../models/TagSchema')

/* GET users listing. */
router.post('/addImage', function (req, res, next) {

    "use strict"
    let form = req.body
    form.tags = form.tagsID.split(',')
    form.tags.pop()
    Image.create(form)
        .then(image => {
            let targettedImages = image.tags
            Tag.update({_id: {$in: targettedImages}}, {$push: {images: image._id}}, {multi: true})
                .then(_ => {
                    res.redirect('/')
                })
                .catch(_ => {
                    res.render('error')
                })
        })
        .catch(_ => {
            res.render('error')
        })
})

module.exports = router
