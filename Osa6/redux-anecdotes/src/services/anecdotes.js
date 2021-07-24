import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)

  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseURL, object)

  return response.data
}

const updateVotes = async (id) => {
  const getResponse = await axios.get(baseURL + '/' + id)

  const updatedAnecdote = { 
    content: String(getResponse.data.content),
    votes: Number(getResponse.data.votes) + 1 
  }

  const putResponse = await axios.put(baseURL + '/' + id, updatedAnecdote)

  return putResponse.data
}

export default {
  getAll,
  createNew,
  updateVotes
}