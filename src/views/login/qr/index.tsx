import React, { useRef } from 'react';
import { loginForKey, loginForCreate, loginForCheck, loginStatus,refreshStatus} from 'src/api/auth';
import { UserInfo } from 'src/api/types/user'
import { Image ,Message } from '@arco-design/web-react';
import './index.less'
import { getLoginStatus } from 'src/utils/user'
import { setInfo } from 'src/store/user/reducer'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const QrLogin = (props: any) => {
    const navigate = useNavigate();
    let [dimensional, setDimensional] = React.useState<string>();
    let [code, setCode] = React.useState<number>();
    let [message, setMassage] = React.useState<string>('等待扫码');
    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>();
    const keyRef = useRef<string>();
    React.useEffect(() => {
        refreshStatus()
        loginForKey().then(res => {
            keyRef.current = res
            const req = res;
            // 获取二维码信息
            loginForCreate(req).then(resp => {
                setDimensional(resp)
            })
        })
        
    }, [])

    React.useEffect(() => {
        const id = setInterval(() => {
            loginForCheck(keyRef.current!).then(res => {
                setCode(res.code)
                setMassage(res.message)
                getLoginStatus()
            })
        }, 2000)
        intervalRef.current = id
        return()=>{
            clearInterval(intervalRef.current!)
        }
    }, [])


    React.useEffect(() => {
        return () => {
            if (code === 803) {
                navigate('/library');
                Message.normal('登录成功')
                clearInterval(intervalRef.current!)
                loginStatus().then(res => {
                    const state: UserInfo = {
                        userId: res.account.id,
                        avatarUrl: res.profile.avatarUrl,
                        nickname: res.profile.nickname,
                        status: true,
                    };
                    props.setInfo(state);
                })
            }
        }
    }, [code])

    return (
        <div>
            {
                dimensional ?
                    <div className='login'>
                        <div className='content'>
                            <Image
                                width={75}
                                className='content-netease'
                                src='https://yili979.oss-cn-beijing.aliyuncs.com/imgnetease-music.png'
                            />
                            <div className='content-title'>登录网易云账号</div>
                            <Image
                                width={250}
                                src={dimensional} alt="二维码信息"
                            />
                            <div>状态:{message}</div>
                            <h3>打开网易云APP扫码登录</h3>
                            <a onClick={()=>{navigate('/login/password')}}>手机号登录</a>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

const mapDispatchToProps = { setInfo };


export default connect(mapStateToProps, mapDispatchToProps)(QrLogin);
