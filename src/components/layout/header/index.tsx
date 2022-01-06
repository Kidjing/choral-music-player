import { Layout, Button, Avatar, Switch, Popover } from '@arco-design/web-react';
import { IconLeft, IconMoon, IconRight, IconSun, IconToRight } from '@arco-design/web-react/icon';
import { logout, loginStatus } from 'src/api/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import Searcher from './searcher';
import { UserInfo } from 'src/api/types/user';

import { connect } from 'react-redux';
import { clearInfo, setInfo } from 'src/store/user/reducer';
import { useEffect, useState } from 'react';
import { getLoginStatus } from 'src/utils/user';
import './index.less';

const Head = Layout.Header;
const Header = (props: any) => {
    let theme = localStorage.getItem('theme');
    const [checked, setChecked] = useState(theme === 'dark' ? true : false);
    const navigate = useNavigate();
    const loginOut = () => {
        logout();
        props.clearInfo();
        navigate('/');
    };
    const libraryLink = () => {
        if (!props.userInfo.status) {
            navigate('/login/qr');
        } else {
            navigate('/library');
        }
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            document.body.removeAttribute('arco-theme');
        }
        if (getLoginStatus()) {
            loginStatus().then((res) => {
                const state: UserInfo = {
                    userId: res.account.id,
                    avatarUrl: res.profile.avatarUrl,
                    nickname: res.profile.nickname,
                    status: true,
                };

                props.setInfo(state);
            });
        }
    }, []);

    const content = (
        <span>
            {
                // 如果status为false显示登录，否则显示登出
                !props.userInfo.status ? (
                    <Button
                        onClick={() => {
                            navigate('/login/qr');
                        }}
                    >
                        <IconToRight />
                        登录
                    </Button>
                ) : (
                    <Button onClick={loginOut}>
                        <IconToRight />
                        登出
                    </Button>
                )
            }
        </span>
    );
    const handleTheme = (e: any) => {
        if (e === true) {
            setChecked(true);
            localStorage.setItem('theme', 'dark');
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            setChecked(false);
            localStorage.setItem('theme', 'light');
            document.body.removeAttribute('arco-theme');
        }
    };

    return (
        <Head
            className="layout-header"
            onDoubleClick={() => {
                document.getElementsByTagName('main')[0].scrollTo({
                    top:0,
                    behavior:'smooth'
                });
            }}
        >
            <nav className="navbar">
                <div className="navbar-btn">
                    <Button onClick={() => navigate(-1)} style={{ background: 'transparent' }}>
                        <IconLeft style={{ fontSize: 26 }} />
                    </Button>
                    <Button onClick={() => navigate(1)} style={{ background: 'transparent' }}>
                        <IconRight style={{ fontSize: 26 }} />
                    </Button>
                </div>
                <div className="navbar-link">
                    <NavLink to="/">首页</NavLink>
                    <NavLink to="/explore">发现</NavLink>
                    {props.userInfo.status ? (
                        <NavLink to="/library">音乐库</NavLink>
                    ) : (
                        <a onClick={libraryLink}>音乐库</a>
                    )}
                </div>
                <div className="navbar-right">
                    <Searcher />

                    <Popover position="bl" content={content} trigger="click">
                        <Avatar className="navbar-right-avatar" size={30}>
                            {props.userInfo.status ? (
                                <img alt="avatar" src={props.userInfo.avatarUrl + '?param=60y60'} />
                            ) : (
                                <img
                                    alt="avatar"
                                    src="https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60"
                                />
                            )}
                        </Avatar>
                    </Popover>

                    <Switch
                        className="navbar-right-switch"
                        checked={checked}
                        onChange={handleTheme}
                        uncheckedIcon={<IconSun />}
                        checkedIcon={<IconMoon />}
                    />
                </div>
            </nav>
        </Head>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

const mapDispatchToProps = { clearInfo, setInfo };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
