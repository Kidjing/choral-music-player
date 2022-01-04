import {  Message } from '@arco-design/web-react';

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
    const { response } = error
    
    if(response.data.code >= 400){
        Message.error(response.data.message)
    }
    return response.data
}

// 创建axios实例
const createInstance = () => {
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

const request: Instance = createInstance()

export default request