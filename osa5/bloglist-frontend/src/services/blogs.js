import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = async (blog) => {
  
  const config = {
    headers: { Authorization: token },
    }

  let response = await axios.post(baseUrl, blog, config)

  return response.data
}

const updateBlog = async(blog, id) => {

  const newUrl = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token },
    }

  let response = await axios.put(newUrl, blog, config)
  return response.data
}

const removeBlog = async(id) => {
  const newUrl = `${baseUrl}/${id}`

  const config = {
    headers: { Authorization: token },
    }
    
  let response = await axios.delete(newUrl, config)
  return response.data
}

export default { getAll, addNew, setToken, updateBlog, removeBlog }