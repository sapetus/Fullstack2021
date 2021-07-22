const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE:FILTER':
      return action.data
    default:
      return state
  }
}

export const changeFilter = (filterText) => {
  return {
    type: 'CHANGE:FILTER',
    data: filterText
  }
}

export default reducer