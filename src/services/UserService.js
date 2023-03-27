import axios from 'axios'

const API_URL = ' http://115.186.185.234:9010'

const register = async payload => {
  try {
    const response = await axios.post(API_URL + '/auth/signup', payload)
    const data = response.data

    return data
  } catch (error) {
    console.error(error)
  }
}
async function login(payload) {
  try {
    const response = await axios.post(API_URL + '/pms/users/login', payload)
    if (response.data.data.token) {
      console.log(response.data.token)
      localStorage.setItem('token', JSON.stringify(response.data.data.token))
    }

    return response.data
  } catch (error) {
    console.error(error)
  }
}

const logout = () => {
  localStorage.removeItem('token')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default {
  register,
  login,
  logout,
  getCurrentUser
}
