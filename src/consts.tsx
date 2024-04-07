import axios from "axios";

export const BASE_URL = 'https://c3b4-178-67-197-99.ngrok-free.app'

export let backend = axios.create({
    baseURL: BASE_URL+ '/api/',
    timeout: 100000,
    // headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
  }
)

export const updateBackend = () =>{
    backend = axios.create({
      baseURL: BASE_URL + '/api/',
      timeout: 100000,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    }
  )
}



export const nonAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4OTM2NDQ5LCJpYXQiOjE2ODYzNDQ0NDksImp0aSI6IjY0MzgyNzg3NmMzZTRhN2Q5ODAzYjJjMTM0MzY1MTg3IiwidXNlcl9pZCI6OH0._4AkdCc5XkfROe_9taVtFGV4Rx2HOM1HnV0Byc7NY_o'