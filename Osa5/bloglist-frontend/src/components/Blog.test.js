import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog.js'

const blog = {
  author: 'Author',
  title: 'Title',
  url: 'url',
  likes: 1,
  user: null
}
const updateBlog = jest.fn()
const removeBlog = jest.fn()
const username = 'username'

let component

beforeEach(() => {
  component = render(
    <Blog
      blog={blog}
      updateBlog={updateBlog}
      removeBlog={removeBlog}
      username={username}
    />
  )
})

test('Render author and title but not url or likes', () => {
  expect(component.container).toHaveTextContent(
    blog.author
  )
  expect(component.container).toHaveTextContent(
    blog.title
  )
  expect(component.container).not.toHaveTextContent(
    blog.url
  )
  expect(component.container).not.toHaveTextContent(
    'likes'
  )
})