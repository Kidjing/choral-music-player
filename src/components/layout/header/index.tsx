import { Layout, Button, Avatar, Switch, Popover } from '@arco-design/web-react';
import { IconLeft, IconMoon, IconRight, IconSun, IconToRight } from '@arco-design/web-react/icon';
import { logout } from 'src/api/auth';
import { Link, useNavigate } from 'react-router-dom';
import Searcher from './searcher';
import { connect } from 'react-redux';
import { clearInfo } from 'src/store/user/reducer'
import './index.less';


const Head = Layout.Header;
const Header = (props: any) => {
    const navigate = useNavigate();
    const loginOut = () => {
        logout();
        props.clearInfo()
    }
    const libraryLink = () => {
        if (!props.userInfo.status) {
            navigate('/login/qr');
        }
    }

    const content = <span>
        {
            // 如果status为false显示登录，否则显示登出
            !props.userInfo.status ?
                <Button onClick={() => { navigate('/login/qr') }} >
                    <IconToRight />登录
                </Button> :
                <Button onClick={loginOut} >
                    <IconToRight />登出
                </Button>
        }
    </span>;
    const handleTheme = (e: any) => {
        if (e === true) {
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            document.body.removeAttribute('arco-theme');
        }
    };
    return (
        <Head className="layout-header">
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
                    <Link to="/">首页</Link>
                    <Link to="/explore">发现</Link>
                    <a onClick={libraryLink}>音乐库</a>
                </div>
                <div className="navbar-right">
                    <Searcher />


                    <Popover position='bl' content={content} trigger='click'>
                        <Avatar className="navbar-right-avatar" size={30}>
                            <img
                                alt="avatar"
                                src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                            />
                        </Avatar>
                    </Popover>

                    <Switch className="navbar-right-switch" onChange={handleTheme} uncheckedIcon={<IconSun />} checkedIcon={<IconMoon />} />
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

const mapDispatchToProps = { clearInfo };



export default connect(mapStateToProps, mapDispatchToProps)(Header);
