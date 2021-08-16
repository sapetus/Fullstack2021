import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment, initializeComments } from '../reducers/commentsReducer'
import { useHistory } from 'react-router'

import {
  TextField,
  Button
} from '@material-ui/core'

const CommentForm = (blogId) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()

    const commentObject = {
      comment: comment
    }

    dispatch(createComment(blogId.blogId, commentObject))
    //couldnt get this to work properly without using this.
    dispatch(initializeComments(blogId.blogId))

    setComment('')

    //refresh page so the comment becomes visible
    history.go(0)
  }

  return (
    <div>
      <form id='comment-form' onSubmit={addComment}>
        <div>
          <TextField label='comment' value={comment} onChange={handleCommentChange} />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Add Comment
        </Button>
      </form>
    </div>
  )
}

export default CommentForm