import { Button } from '@arco-design/web-react';
import { getAlbum } from '../../api/album'
import { login } from '../../api/auth'
import { LoginInRequest } from '../../api/types/auth'

const testAlbum = () => {
    getAlbum(44444).then(res => {
        console.log(res);
    })
}

const testLoginIn = () => {
    const loginParams: LoginInRequest = {
        phone: "17814775526",
        password: "979yili."
    }
    login(loginParams).then(res=>{
        console.log(res);
        
    })
}

const APITest = () => {
    return (
        <div>
            <Button onClick={testAlbum} type='primary'>测试专辑</Button>
            <Button onClick={testLoginIn} type='primary'>测试登录</Button>
        </div>
    );
};

export default APITest;
