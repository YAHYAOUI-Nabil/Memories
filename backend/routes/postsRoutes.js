const express = require('express')
const router = express.Router()
const postsControllers = require('../controllers/postsControllers')

router.get('/', postsControllers.getPosts)
router.get('/:id', ()=>{})
router.post('/', postsControllers.createPost)
router.delete('/', ()=>{})
router.put('/', ()=>{})
router.patch('/', ()=>{})

module.exports = router