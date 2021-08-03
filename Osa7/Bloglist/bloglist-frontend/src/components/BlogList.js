/* eslint-disable */

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  //sort blogs in to descending order
  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => {
      const likesA = a.likes
      const likesB = b.likes

      if (likesA < likesB) {
        return 1
      }
      if (likesA > likesB) {
        return -1
      }

      return 0
    })

    return blogs
  }

  const updateBlog = async (blogObject, id) => {
    await blogService.update(blogObject, id)

    //update the list of blogs
    const blogsInDb = await blogService.getAll()
    setBlogs(sortBlogs(blogsInDb))
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)

    //update the list of blogs
    const blogsInDb = await blogService.getAll()
    setBlogs(sortBlogs(blogsInDb))

    setMessage('Blog has been deleted', 5)
  }

  const sortedBlogs = sortBlogs(blogs)

  return (
    <div id='blog_list'>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default BlogList