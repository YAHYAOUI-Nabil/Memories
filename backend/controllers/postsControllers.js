const PostMessage = require('../models/postMessage')
const mongoose = require('mongoose') 


exports.getPosts = async (req, res) => { 
    const {page} = req.query
    try {
        const LIMIT = 6
        const startIndex = (Number(page)-1)*LIMIT
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find().sort({_id : -1}).limit(LIMIT).skip(startIndex)
                
        res.status(200).json({data : posts, currentPage : Number(page), numberOfPages : Math.ceil(total/LIMIT)})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.getPostsBySearch = async (req, res) => { 
    const {searchQuery, tags} = req.query
    try {
        const title = new RegExp (searchQuery, 'i')
        const posts = await PostMessage.find({$or: [{title}, {tags: {$in: tags.split(',')}}]})
                
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.getPost = async (req, res) => { 
    const { id } = req.params

    try {
        const post = await PostMessage.findById(id)
        
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

exports.createPost = async (req, res) => {
    const post = req.body

    const newPostMessage = new PostMessage({ ...post, creator:req.userId, createdAt : new Date().toISOString() })

    try {
        await newPostMessage.save()

        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params
    const { title, message, creator, selectedFile, tags } = req.body
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    const newPost = { creator, title, message, tags, selectedFile, _id: id }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, newPost, { new: true })

    res.json(updatedPost)
}

exports.deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: "Post deleted successfully." })
}

exports.likePost = async (req, res) => {
    const { id } = req.params

    if(!req.userId){
        return res.status(401).json({message : `Unauthenticated?`})
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`)
    } 
    
    const post = await PostMessage.findById(id)

    const index = await post.likes.findIndex((id) => id===String(req.userId))
    if(index===-1){
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    
    res.json(updatedPost)
}

exports.commentPost = async (req, res) => {
    const { id } = req.params
    const { value } = req.body

    const post = await PostMessage.findById(id)

    post.comments.push(value)

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

    res.status(200).json(updatedPost)

}

