import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  const initialState = [
    {
      content: 'anecdote 1',
      id: 1,
      votes: 0
    },
    {
      content: 'anecdote 2',
      id: 2,
      votes: 0
    }
  ]

  test('VOTE action increments vote', () => {
    const action = {
      type: 'VOTE',
      data: {
        id: 1
      }
    }
    const state = initialState
    deepFreeze(state)

    const newState = anecdoteReducer(state, action)
    expect(newState).toContainEqual({
      content: 'anecdote 1',
      id: 1,
      votes: 1
    })
  })
})