const express = require('express')
const router = express.Router()
const postsControllers = require('../controllers/postsControllers')
const auth = require('../middlewares/auth')

router.get('/', postsControllers.getPosts)
router.get('/search', postsControllers.getPostsBySearch)
router.get('/:id', postsControllers.getPost)
router.post('/', auth, postsControllers.createPost)
router.delete('/:id', auth, postsControllers.deletePost)
router.put('/:id', auth, postsControllers.updatePost)
router.patch('/likes/:id', auth, postsControllers.likePost)
router.post('/comments/:id', auth, postsControllers.commentPost)

module.exports = router