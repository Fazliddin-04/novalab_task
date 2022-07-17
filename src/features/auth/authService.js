import axios from "axios";

const API_URL = '/api/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'users', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response1 = await axios.post(API_URL + 'register', userData)

  if (response1.data) {
    const response2 = await axios.get(API_URL + 'users/' + response1.data.id)
    localStorage.setItem('user', JSON.stringify(response2.data.data))

    return response2.data.data
  }
}

// Update user
const update = async (userData) => {
  const response = await axios.put(API_URL + 'users/' + userData.id, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))

    return response.data
  }
}

// logout user
const logout = () => localStorage.removeItem('user')


const authService = {
  register,
  login,
  update,
  logout
}

export default authService