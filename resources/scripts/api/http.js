import axios from 'axios';

export const source = axios.CancelToken.source();
export const isCancelledByUser = (error) => {
  if (axios.isCancel(error)) {
    console.error('Request cancelled by user.')
    return true
  }

  console.error('The request has failed.')
  return false
}

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
