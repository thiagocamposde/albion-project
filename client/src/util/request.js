import axios from 'axios'

// const url = process.env.API_URL
const url = 'http://localhost:5000'

const request = axios.create({
  baseURL: `${url}`,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
})

export default request
