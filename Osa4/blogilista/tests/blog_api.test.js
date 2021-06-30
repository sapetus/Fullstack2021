const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const helper = require('./test_helper.js')
const bcrypt = require('bcrypt')

describe('Blog tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const initialUserPasswordHash = 
            await bcrypt.hash('testPassword', 10)
        const initialUser = {
            username: 'testUsername',
            name: 'testName',
            passwordHash: initialUserPasswordHash
        }
        await User.create(initialUser)

        const userInDb = await helper.usersInDb()
        const userId = userInDb[0].id

        const blogsToInsert = helper.initialBlogs
        blogsToInsert.map(blog => {
            blog.user = userId
        })

        await Blog.deleteMany({})
        await Blog.insertMany(blogsToInsert)
    })

    //these work
    describe('HTTP GET for blogs', () => {
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
    
        test('a specific blog is returned', async () => {
            const response = await api.get('/api/blogs')
            const contents = response.body

            contents.map(blog => {
                blog.user = blog.user[0].id
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
    
    //doesnt work
    describe('HTTP POST for blogs', () => {
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
    
    //doesnt work
    describe('HTTP DELETE for blogs', () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'Test URL',
            likes: 999
        }
    
        test('a specific blog is deleted', async () => {
            const results = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
            
            const savedNote = results.body
    
            const response_1 = await api.get('/api/blogs')
            const notesInDbBeforeDeletion = response_1.body
            
            await api
                .delete(`/api/blogs/${savedNote.id}`)
                .expect(204)
            
            const response_2 = await api.get('/api/blogs')
            const notesInDbAfterDeletion = response_2.body
    
            expect(notesInDbBeforeDeletion.length).toEqual(notesInDbAfterDeletion.length + 1)
        })
    })
    
    //doesnt work
    describe('HTTP PUT for blogs', () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'Test URL',
            likes: 999
        }
    
        test('a blog can be updated', async () => {
            //post a blog to be modified
            const postResults = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
            //data of the post
            const postedBlog = postResults.body
    
            //information to be updated
            const updateInformation = {likes: 1000}
    
            //this is an identical object to the one being updated
            const updatedNewBlog = {...newBlog, ...updateInformation}
    
            //the update itself
            const putResults = await api
                .put(`/api/blogs/${postedBlog.id}`)
                .send(updateInformation)
            //data of the update
            const updatedBlog = putResults.body
    
            //delete id field of the updatedata
            delete updatedBlog.id
    
            expect(updatedBlog).toEqual(updatedNewBlog)
        })
    })
})

//these work
describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('a new user can be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testUsername',
            name: 'testName',
            password: 'testPassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
    
    test('user with invalid password cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            username: 'test',
            name: 'test',
            password: 'a'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user with no password cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            username: 'test',
            name: 'test'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user with invalid username cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            username: 'a',
            name: 'test',
            password: 'test'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user with no username cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            name: 'test',
            password: 'test'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user with invalid username and password cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            username: 'a',
            name: 'test',
            password: 'a'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user with no username and no password cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            name: 'test'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})