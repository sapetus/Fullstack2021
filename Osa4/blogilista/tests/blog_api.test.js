const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog.js')
const helper = require('./test_helper.js')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP GET to /api/blogs', () => {
    test('return blogs as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('return all blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body
        
        contents.map(blog => {
            delete blog.id
        })

        expect(contents).toContainEqual(helper.initialBlogs[0])
    })

    test('identifying field is named id', async () => {
        const response = await api.get('/api/blogs')
        const propertyNames = Object.getOwnPropertyNames(response.body[0])

        expect(propertyNames).toContain('id')
    })
})

describe('HTTP POST to /api/blogs', () => {
    //a blog to be posted 
    const newBlog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test URL',
        likes: 999
    }
    const newBlogWithoutLikes = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test URL'
    }
    const newBlogWithoutTitleAndURL = {
        author: 'Test Author',
        likes: 999
    }

    test('when a blog is POSTed, number of blogs increases', async () => {
        //post a new blog
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        //get notes in db
        const response = await api.get('/api/blogs')
        const notesInDb = response.body

        expect(notesInDb).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('POSTed blog has right content', async () => {
        //post a blog
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        //notes in db
        const response = await api.get('/api/blogs')
        const notesInDb = response.body
        //removes the id field of each blog
        notesInDb.map(blog => {
            delete blog.id
        })
        
        expect(notesInDb).toContainEqual(newBlog)
    })

    test('POSTed blog with no likes value has it set to 0', async () => {
        await api
            .post('/api/blogs')
            .send(newBlogWithoutLikes)
            .expect(201)
        
        const response = await api.get('/api/blogs')
        const notesInDb = response.body

        expect(notesInDb[notesInDb.length - 1].likes).toEqual(0)
    })

    test('POSTing a blog with no title and url isnt added to db', async () => {
        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitleAndURL)
            .expect(400)
        
        const response = await api.get('/api/blogs')
        const notesInDb = response.body

        expect(notesInDb).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})