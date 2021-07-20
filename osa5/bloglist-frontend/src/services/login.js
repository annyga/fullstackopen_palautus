import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async(tunnus, salasana) => {
    let response = await axios.post(baseUrl, {tunnus, salasana})

    return response.data
} 

export default {loginUser}