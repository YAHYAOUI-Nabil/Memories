import axios from 'axios'

const API = axios.create({baseURL : `http://localhost:5000`})
const URI ='/memories/posts'
const auth_URI = `/memories/auth`

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchPosts = (page) => API.get(`${URI}?page=${page}`)
export const fetchPost = (id) => API.get(`${URI}/${id}`)
export const createPost = (newPost) => API.post(URI, newPost)
export const likePost = (id) => API.patch(`${URI}/likes/${id}`)
export const commentPost = (value, id) => API.post(`${URI}/comments/${id}`, {value})
export const updatePost = (id, updatedPost) => API.put(`${URI}/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`${URI}/${id}`)

export const signin = (formData) => axios.post(`${auth_URI}/signin`, formData)
export const signup = (formData) => axios.post(`${auth_URI}/signup`, formData)

export const fetchPostsBySearch = (searchQuery) => API.get(`${URI}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)