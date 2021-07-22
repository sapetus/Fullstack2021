import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filterReducer', () => {
  const initialState = ''

  test('CHANGE:FILTER action changes state', () => {
    const action = {
      type: 'CHANGE:FILTER',
      data: 'a new filter'
    }

    const state = initialState
    deepFreeze(state)

    const newState = filterReducer(state, action)
    expect(newState).toEqual(action.data)
  })
})