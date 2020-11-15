const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')

//POST new messages in /comments
router.post('/', (req, res)=>{
    console.log('@@@@@@@@@@@@@@@',req)
    db.comment.create({
        content: req.body.commentContent,
        userName: req.body.userName
    })
    .then(comment => {
        res.redirect('/comments')
    })
})

//GET all messages in /comments
router.get('/', (req, res)=>{
    console.log('@@@@@@@@@@@@@@@',req)
    db.comment.findAll()
    .then(comments => {
        console.log(req.session)
        res.render('comments', {comments: comments, userNames: userNames})
    })
})

//DELETE comment route
router.delete('/:idx', (req, res) => {
    db.comment.destroy({
        where: {
            content: req.body.content
        }
    })
    .then(deleted => {
        res.redirect('/comments')
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router