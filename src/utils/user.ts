import cookie from "react-cookies";

// 判断当前的登录状态，在登录则返回true，不在登录则返回false
export const getLoginStatus = () => {
    let user = cookie.load('__csrf');
    if (user === undefined) {
        return false;
    }
    return true;

}