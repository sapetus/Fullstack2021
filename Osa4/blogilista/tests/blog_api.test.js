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

afterAll(() => {
    mongoose.connection.close()
})