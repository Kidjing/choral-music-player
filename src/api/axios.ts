import axios, { AxiosRequestConfig, ResponseType, AxiosInstance } from 'axios'
import { SERVER } from '../contants/server'

interface Instance extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
}

// 赋值给JSON
const JSON: ResponseType = 'json'

const instance = axios.create({
    baseURL: SERVER,
    timeout: 2000,
    withCredentials: true,
    responseType: JSON
})

const handleResponse = (response: any) => {
    return response.data
}
  
const handleError = (error: any) => {
    const { response, message } = error
    return Promise.reject(response ? new Error(response.data.message || message) : error)
}

// 创建axios实例
const createInstance = () => {
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

const request: Instance = createInstance()

export default request