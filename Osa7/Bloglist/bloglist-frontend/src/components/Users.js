import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core'

const Users = () => {
  //get all of the blogs in store
  const blogs = useSelector(state => state.blogs)
  //get users
  const uniqueUsers = useSelector(state => state.users)

  //create an array with objects consisting of username and amount of blogs
  const usersWithBlogs = new Array()
  uniqueUsers.map(user =>
    usersWithBlogs.push({
      username: user.username,
      id: user.id,
      blogs: 0
    })
  )

  //go through the users and blogs and increment the values of the array above when user matches the user in the blog
  uniqueUsers.forEach(user => {
    blogs.forEach(blog => {
      if (user.username === blog.user[0].username) {
        usersWithBlogs.forEach(object => {
          if (object.username === user.username) {
            object.blogs += 1
          }
        })
      }
    })
  })

  return (
    <div>
      <Typography variant='h4' component='h4' gutterBottom>Users</Typography>
      <Table>
        <TableBody>
          <TableHead>
            <TableCell>
              USER
            </TableCell>
            <TableCell>
              BLOGS CREATED
            </TableCell>
            {usersWithBlogs.map(object =>
              <TableRow key={object.id}>
                <TableCell>
                  <Link to={`/users/${object.id}`}>
                    {object.username}
                  </Link>
                </TableCell>
                <TableCell>
                  {object.blogs}
                </TableCell>
              </TableRow>
            )}
          </TableHead>
        </TableBody>
      </Table>
    </div>
  )
}

export default Users