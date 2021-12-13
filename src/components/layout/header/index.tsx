import { Layout, Button, Avatar } from '@arco-design/web-react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import { Link, useNavigate } from 'react-router-dom';
import Searcher from './searcher';

import './index.less';

const Head = Layout.Header;

const Header = () => {
    const navigate = useNavigate();
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
                    <Link to="/library">音乐库</Link>
                </div>
                <div className="navbar-right">
                    <Searcher />
                    <Avatar className="navbar-right-avatar" onClick={() => {}} size={30}>
                        <img
                            alt="avatar"
                            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                        />
                    </Avatar>
                </div>
            </nav>
        </Head>
    );
};

export default Header;
