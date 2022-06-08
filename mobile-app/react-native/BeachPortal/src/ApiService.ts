import axios, { AxiosInstance } from 'axios'

class ApiService {
  private static instance: ApiService
  session: AxiosInstance

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  private constructor() {
    const baseURL = 'https://www.skcvolleybal.nl/beach-portal/'

    this.session = axios.create({ baseURL })
    // Add a request interceptor
    this.session.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      },
    )

    // Add a response interceptor
    this.session.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      },
    )
  }

  setAuthenticationToken = (token: string | null) => {
    if (token) {
      this.session.defaults.headers.common.Authorization = `Token ${token}`
    } else {
      delete this.session.defaults.headers.common.Authorization
    }
  }

  get = (url: string) => this.session.get(url)
  post = (url: string, data: any) => this.session.post(url, data)
  put = (url: string, data: any) => this.session.put(url, data)
}

const apiService = ApiService.getInstance()

export default apiService
