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

  test('CREATE action creates a new anecdote', () => {
    const action = {
      type: 'CREATE',
      data: {
        content: 'An Anecdote',
        id: 3,
        votes: 0
      }
    }
    const state = initialState
    deepFreeze(state)

    const newState = anecdoteReducer(state, action)
    expect(newState.length).toEqual(state.length + 1)
    expect(newState).toContainEqual({
      content: 'An Anecdote',
      id: 3,
      votes: 0
    })
  })
})