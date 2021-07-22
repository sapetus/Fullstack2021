import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  const initialState = 'this is initial a notification'

  test('CHANGE:NOTIFICATION action changes notification', () => {
    const action = {
      type: 'CHANGE:NOTIFICATION',
      data: 'This is a changed notification'
    }

    const state = initialState
    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toEqual(action.data)
  })

  test('HIDE action changes notification to null', () => {
    const action = {
      type: 'HIDE'
    }

    const state = initialState
    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toEqual(null)
  })
})