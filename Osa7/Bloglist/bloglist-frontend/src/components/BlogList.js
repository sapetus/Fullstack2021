import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core'

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
    <div>
      <Typography variant='h4' component='h4'>Blogs</Typography>
      <Table>
        <TableBody>
          {sortedBlogs.map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default BlogList