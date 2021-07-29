import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl)

    return response.data;
}

const addAnecdote = async (dote) => {
    const response = await axios.post(baseUrl, dote)
    return response.data
}

const addVoteToAnecdote = async (dote) => {
    const response = await axios.put(`${baseUrl}/${dote.id}`, {id: dote.id, content: dote.content, votes: dote.votes +1})
    return response.data
}

export default {getAll, addAnecdote, addVoteToAnecdote}