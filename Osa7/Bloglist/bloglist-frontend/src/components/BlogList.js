/* eslint-disable */

import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
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

  const sortedBlogs = sortBlogs(blogs)

  return (
    <div id='blog_list'>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default BlogList