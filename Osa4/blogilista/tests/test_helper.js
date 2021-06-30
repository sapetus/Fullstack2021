const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const initialBlogs = [
    {
        title: 'A blog',
        author: 'Blog Bloginton',
        url: 'www.pagewithblog.com',
        likes: 10,
        user: ''
    },
    {
        title: 'stuff i do',
        author: 'Author McAuthorface',
        url: 'www.webpagewithaplog.com',
        likes: 100,
        user: ''
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    usersInDb
}