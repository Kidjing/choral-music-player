import cookie from "react-cookies";
import request from "./axios";
import { LoginInRequest, LoginInResponce} from './types/auth';

type LoginIn = (req: LoginInRequest) => Promise<LoginInResponce>
// 通过用户名和密码进行登录
// http://www.yili.fit:3000/login/cellphone
export const login: LoginIn = async (req) => {
    const response = await request({
        method: 'post',
        url: '/login/cellphone',
        data: {
            phone: req.phone,
            password: req.password,
        },
    })
    // 设置cookie 4天时间生效
    let cookieTime = new Date(new Date().getTime() + 96 * 3600 * 1000);
    cookie.save("user-cookie",response.cookie,{expires: cookieTime})

    return response
}


type LogOut = () => Promise<boolean>
// 登出
// http://www.yili.fit:3000/logout
export const logout: LogOut = async () => {
    const response = await request({
        method: 'post',
        url: '/logout/cellphone',
    })
    // 登出直接删除cookie
    cookie.remove("user-cookie")
    if (response.code !== '200') return false
    return true
}


