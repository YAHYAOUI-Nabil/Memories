import axios from 'axios'

const URI ='/memories/posts'
const auth_URI = `/memories/auth`

export const fetchPosts = () => axios.get(URI)
export const createPost = (newPost) => axios.post(URI, newPost)
export const likePost = (id) => axios.patch(`${URI}/likes/${id}`)
export const updatePost = (id, updatedPost) => axios.put(`${URI}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${URI}/${id}`)

export const signin = (formData) => axios.post(`${auth_URI}/signin`, formData)
export const signup = (formData) => axios.post(`${auth_URI}/signup`, formData)