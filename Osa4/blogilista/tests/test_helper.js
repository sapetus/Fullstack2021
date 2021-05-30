const Blog = require('../models/blog.js')

const initialBlogs = [
    {
        title: 'A blog',
        author: 'Blog Bloginton',
        url: 'www.pagewithblog.com',
        likes: 10
    },
    {
        title: 'stuff i do',
        author: 'Author McAuthorface',
        url: 'www.webpagewithaplog.com',
        likes: 100
    }
]

module.exports = {
    initialBlogs
}