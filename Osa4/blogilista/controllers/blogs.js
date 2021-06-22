const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

//get all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

//post a new blog
blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    //if no likes are given, set likes to 0
    if (!blog.likes) {
        blog.likes = 0
    }

    if(!blog.title && !blog.url) {
        response.status(400).json(result)
    } else {
        blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
    }
})

module.exports = blogsRouter