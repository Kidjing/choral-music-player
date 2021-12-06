import { Layout, Button } from '@arco-design/web-react';
import { IconLeft, IconRight /* IconUser */ } from '@arco-design/web-react/icon';
import classNames from 'classnames';
// import { Link } from "react-router-dom";
import './index.less';

const Head = Layout.Header;

const Header = () => {
    return (
        <Head className="layout-header">
            <Button className={classNames('layout-header-btn', 'left')} onClick={goBack}>
                <IconLeft style={{ fontSize: 26 }} />
            </Button>
            <Button className={classNames('layout-header-btn', 'right')} onClick={goForward}>
                <IconRight style={{ fontSize: 26 }} />
            </Button>
            {/* <Link to='/HomePage' style={{width:'6%',marginLeft:'16%'}} >
                <Button style={{height:60,fontSize:22,backgroundColor:'transparent'}}>首页</Button>
            </Link>
            <Link to='/Discover' style={{width:'6%'}} >
                <Button style={{height:60,fontSize:22,backgroundColor:'transparent'}}>发现</Button>
            </Link>
            <Link to='/MusicLibrary' style={{width:'6%',marginRight:'16%'}} >
                <Button style={{height:60,fontSize:22,backgroundColor:'transparent'}}>音乐库</Button>
            </Link>
            <Link to='/MusicLibrary' >
                <Button style={{fontSize:32,height:60,backgroundColor:'transparent'}} >
                    <IconUser style={{fontSize:32}} />
                </Button>
            </Link> */}
        </Head>
    );
};

const goBack = () => {
    window.history.back();
};
const goForward = () => {
    window.history.forward();
};

export default Header;
