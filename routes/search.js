let express = require('express')
let router = express.Router()
let Tag = require('./../models/TagSchema')
let qs = require('querystring')
let url = require('url')

/* GET users listing. */
router.get('/search', function(req, res, next) {
    req.pathquery = req.query
    let query = {}
    if(req.pathquery.tagName){
        query.tagName = req.pathquery.tagName
    }
    let imageQuery ={}
    if(req.pathquery.beforeDate){
        imageQuery.$lte = req.pathquery.beforeDate
    }
    if(req.pathquery.afterDate){
        imageQuery.$gte = req.pathquery.afterDate
    }
    if(Object.keys(imageQuery).length === 0 && imageQuery.constructor === Object){
        imageQuery = null
    }
    if(imageQuery){
        Tag.find(query).populate({
            path: 'images',
            match: { creationDate:  imageQuery }
        })
            .sort('-creationDate')
            .then(tags => {
                showContent(tags, req.pathquery, res)
            }).catch(err => {
            console.error(err.message)
        })
    }else{
        Tag.find(query).populate({
            path: 'images'
        })
            .sort('-creationDate')
            .then(tags => {
                showContent(tags, req.pathquery, res)
            }).catch(err => {
            console.error(err.message)
        })
    }
})

function showContent(tags, queryString, res) {
    "use strict"

    let data = []
    let counter = 0
    tags.forEach(tag => {
        tag.images
            .forEach(image => {
                if (queryString.Limit) {
                    if (counter < parseInt(queryString.Limit)) {
                        if (data.indexOf(image) === -1) {
                            data.push(image)
                            counter++
                        }
                    }
                } else {
                    if (data.indexOf(image) === -1) {
                        data.push(image)
                    }
                }
            })
    })
    res.render('search', {data: data})
}

module.exports = router
