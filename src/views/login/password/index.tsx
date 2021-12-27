import React from 'react';
import { login, refreshStatus } from 'src/api/auth';
import { UserInfo } from 'src/api/types/user'
import { Image, Input, Space, Button, Message } from '@arco-design/web-react';
import './index.less'
import { setInfo } from 'src/store/user/reducer'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PasswordLogin = (props: any) => {
    const navigate = useNavigate();
    let [phone, setPhone] = React.useState<string>('');
    let [password, setPassword] = React.useState<string>('');

    const phoneInputChange = (inputValue: string) => {
        setPhone(inputValue)
    }
    const passwordInputChange = (inputValue: string) => {
        setPassword(inputValue)
    }
    const summit = () => {
        login({ phone, password }).then(res => {
            refreshStatus()
            if (res.code === 200) {
                const state: UserInfo = {
                    userId: res.account.id,
                    avatarUrl: res.profile.avatarUrl,
                    nickname: res.profile.nickname,
                    status: true,
                };

                props.setInfo(state);
                navigate('/library');
                Message.success('登录成功');
            } else if(res.code === 400){
                Message.error('账号不存在');
            }
        })
    }
    return (
        <div>
            <div className='login'>
                <div className='content'>
                    <Image
                        width={75}
                        className='content-netease'
                        src='https://yili979.oss-cn-beijing.aliyuncs.com/imgnetease-music.png'
                    />
                    <div className='content-title'>登录网易云账号</div>

                    <div>
                        <Space direction='vertical'>
                            <Input className='input' onChange={phoneInputChange}
                                addBefore='+86' placeholder='手机号' />
                            <Input.Password
                                placeholder='密码'
                                className='input'
                                onChange={passwordInputChange}
                                onPressEnter={summit}
                            />
                            <Button className='button' onClick={summit}>提交</Button>
                        </Space>
                    </div>
                    <a onClick={() => { navigate('/login/qr') }}>二维码登录</a>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

const mapDispatchToProps = { setInfo };


export default connect(mapStateToProps, mapDispatchToProps)(PasswordLogin);
