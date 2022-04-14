// 待讨论，是否需要把axios分离处理
import axios from 'axios'

const http = axios.create({
  timeout: 10 * 1000,
  withCredentials: true,
})

export const setHeaders = (headers) => {
  Object.keys(headers).forEach((key => {
    const val = headers[key]
    if (val || val === 0) {
      http.defaults.headers.common[key] = val
    }
  }))
}

export const fetchData = (url, options) => {
  return new Promise((resolve, reject) => {
    http(url, options)
    .then(res => {
      console.log(res)
      if ((res.status >= 200 && res.status < 300)) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
}

export default http
