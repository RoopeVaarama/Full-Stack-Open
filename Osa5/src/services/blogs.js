import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const updateBlog = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const setToken = (newToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }
