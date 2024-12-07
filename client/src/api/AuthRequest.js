import axios from 'axios'

const api = 'http://localhost:3000/api'

export const registerApi = user => axios.post(`${api}/auth/register`, user)
export const loginApi = user => axios.post(`${api}/auth/login`, user)