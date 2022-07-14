import axios from 'axios'

const url ='/memories/posts'

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)
export const likePost = (id) => axios.patch(`${url}/likes/${id}`)
export const updatePost = (id, updatedPost) => axios.put(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`)