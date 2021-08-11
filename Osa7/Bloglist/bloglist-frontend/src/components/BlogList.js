import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <p className='blog'>{blog.title} by {blog.author}</p>
        </Link>
      )}
    </div>
  )
}

export default BlogList