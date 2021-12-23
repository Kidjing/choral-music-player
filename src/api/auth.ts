import cookie from "react-cookies";
import request from "./axios";
import { ILoginInRequest, ILoginInResponce,ILoginStatus} from './types/auth';

type LoginIn = (req: ILoginInRequest) => Promise<ILoginInResponce>
// 通过用户名和密码进行登录
// http://www.yili.fit:3000/login/cellphone
export const login: LoginIn = async (req) => {
    const response = await request({
        method: 'post',
        url: '/login/cellphone',
        data: {
            phone: req.phone,
            password: req.password,
            timestamp:Date.now(),
        },
    })
    // 设置cookie 4天时间生效
    let cookieTime = new Date(new Date().getTime() + 96 * 3600 * 1000);
    cookie.save("user-cookie",response.cookie,{expires: cookieTime})

    return response
}

type LoginForKey = () => Promise<string>
// 通过用户名和密码进行登录
// http://www.yili.fit:3000/login/qr/key
export const loginForKey: LoginForKey = async () => {
    const response = await request({
        url: '/login/qr/key',
        params:{
            timestamp:Date.now(),
        }
    })

    return response.data.unikey;
}

type LoginForCreate = (req:string) => Promise<string>
// 生成二维码
// http://www.yili.fit:3000/login/qr/create
export const loginForCreate: LoginForCreate = async (req) => {
    const response = await request({
        url: '/login/qr/create',
        params:{
            key: req,
            qrimg: req,
            timestamp:Date.now(),
        }
    })

    return response.data.qrimg;
}



type LoginForCheck = (key:string) => Promise<{code:number,message:string}>
// 检查二维码状态
// http://www.yili.fit:3000/login/qr/create
export const loginForCheck: LoginForCheck = async (key) => {
    const response = await request({
        url: '/login/qr/check',
        params:{
            key,
            timestamp:Date.now(),
        }
    })

    return response;
}


type LogOut = () => Promise<boolean>
// 登出
// http://www.yili.fit:3000/logout
export const logout: LogOut = async () => {
    const response = await request({
        url: '/logout',
        params:{
            timestamp:Date.now(),
        }
    })
    // 登出直接删除cookie
    cookie.remove("user-cookie")
    if (response.code !== '200') return false
    return true
}

// http://www.yili.fit:3000/login/status

type LoginStatus = () => Promise<ILoginStatus>
export const loginStatus: LoginStatus = async () => {
    const response = await request({
        url: '/login/status',
        params:{
            timestamp:Date.now(),
        }
    })
    return response.data;
}




// http://www.yili.fit:3000/login/refresh
// 刷新登录状态
export const refreshStatus = async () => {
    await request({
        url: '/login/refresh',
        params:{
            timestamp:Date.now(),
        }
    })
}