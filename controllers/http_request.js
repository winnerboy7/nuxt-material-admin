import axios from 'axios'
import { authHeader } from './auth-header'

function handleError(error) {
  // console.log({...error})
  // console.log("Error: ", error.response)

  let errMessage = error
  if (error.response) {
    errMessage = error.response.data.message || error.response.data.errmsg || error.response.statusText

    // if (error.response.status === 401) {
    //   location.href = "/login"
    // }
  }
  return errMessage
}

const axiosInstance = axios.create({
  // baseURL: "http://www.xxx.com/api",
  timeout: 120000,
})

axiosInstance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(handleError(error))
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(handleError(error))
  }
)

class HttpRequest {
  constructor() {
    this.axios = axios
  }

  setHeader(header) {
    axiosInstance.defaults.headers.common[header.key] = header.value
    axiosInstance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
  }

  fetch(methodName, data) {
    return axiosInstance.get(methodName, {
      headers: authHeader(),
      params: data,
    })
  }

  create(methodName, data) {
    return axiosInstance.post(methodName, data, {
      headers: authHeader(),
    })
  }

  update(methodName, data) {
    return axiosInstance.put(methodName, data, {
      headers: authHeader(),
    })
  }

  delete(methodName, _id) {
    return axiosInstance.delete(methodName, {
      headers: authHeader(),
      params: {
        id: _id
      },
    })
  }

  request(type, url, data) {
    let promise = null
    switch (type) {
      case "GET":
        promise = axios.get(url, { params: data })
        break
      case "POST":
        promise = axios.post(url, data)
        break
      case "PUT":
        promise = axios.put(url, data)
        break
      case "DELETE":
        promise = axios.delete(url, data)
        break
      default:
        promise = axios.get(url, { params: data })
        break
    }
    return promise
  }
}

export default HttpRequest
