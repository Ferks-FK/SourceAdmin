import axios from 'axios';

const http = axios.create({
  withCredentials: true,
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default http;
