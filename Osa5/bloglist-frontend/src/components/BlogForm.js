import React from 'react'

const BlogForm = ({
  title, titleChange,
  author, authorChange,
  url, urlChange,
  addBlog
}) => (
  <div>
    <h2>Add a new Blog</h2>
    <form onSubmit={addBlog}>
      Title:
      <input
        type='text'
        value={title}
        onChange={titleChange}
      />
      <br />
      Author:
      <input
        type='text'
        value={author}
        onChange={authorChange}
      />
      <br />
      URL:
      <input
        type='text'
        value={url}
        onChange={urlChange}
      />
      <br />
      <button type='submit'>create</button>
    </form>
  </div>
)

export default BlogForm