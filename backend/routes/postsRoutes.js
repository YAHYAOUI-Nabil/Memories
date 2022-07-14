const express = require('express')
const router = express.Router()
const postsControllers = require('../controllers/postsControllers')

router.get('/', postsControllers.getPosts)
router.get('/:id', postsControllers.getPost)
router.post('/', postsControllers.createPost)
router.delete('/:id', postsControllers.deletePost)
router.put('/:id', postsControllers.updatePost)
router.patch('/likes/:id', postsControllers.likePost)

module.exports = router