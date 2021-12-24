import { Button } from '@arco-design/web-react';
import { getAlbum } from '../../api/album'
import { login, logout } from '../../api/auth'
import { ILoginInRequest } from '../../api/types/auth'
import { getPlaylistDetail } from 'src/api/songlist'

const testAlbum = () => {
    getAlbum(44444).then(res => {
        console.log(res);
    })
}

const testLoginIn = () => {
    const loginParams: ILoginInRequest = {
        phone: "17814775526",
        password: "979yili."
    }
    login(loginParams).then(res => {
        console.log(res);
    })
}

const testLogout = () => {
    logout().then(res => {
        console.log(res);
    })
}


const testGetArtistDetail = () => {
    getPlaylistDetail(514947114).then(res => {
        console.log(res);
    })
}

const APITest = () => {
    return (
        <div>
            <Button onClick={testAlbum} type='primary'>测试专辑</Button>
            <Button onClick={testLoginIn} type='primary'>测试登录</Button>
            <Button onClick={testLogout} type='primary'>测试登出</Button>
            <Button onClick={testGetArtistDetail} type='primary'>测试获取用户详细信息</Button>

        </div>
    );
};

export default APITest;
