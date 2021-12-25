import React from 'react';
import { Button, Alert } from '@arco-design/web-react';
import { IconHeart } from '@arco-design/web-react/icon';
import { Track } from 'src/components/track-list';
import { IMusic } from 'src/api/types/song';
import { connect } from 'react-redux';

import './index.less';

interface SongMsg {
    song:IMusic;
    isCollected:boolean;
}

const Song = (props: any) => {
    const {song,isCollected}=props
    const [like, setLike] = React.useState<boolean>(isCollected)
    const [alert, setAlert] = React.useState<boolean>(false)
    return (
        <div className="current-song">
            {alert?(
                <Alert className='alert' closable type='warning'  content='需要登录才能使用该功能' onClose={()=>{setAlert(false)}} />
            ):(
                null
            )}
            <Track album={song} hoverable={false}/>
            <Button
                onClick={()=>{
                    if(props.userInfo.status){
                        setLike(!like)
                    }else{
                        setAlert(true)
                    }
                }}
                className="like-btn"
                title="收藏"
            >
                {like === true ? (
                    <IconHeart style={{ fontSize: 20, color: 'red' }} />
                ) : (
                    <IconHeart style={{ fontSize: 20 }} />
                )}
            </Button>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(Song);
