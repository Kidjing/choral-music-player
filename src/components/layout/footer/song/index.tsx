import React from 'react';
import { Button, Message } from '@arco-design/web-react';
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
    return (
        <div className="current-song">
            <Track album={song} hoverable={false}/>
            <Button
                onClick={()=>{
                    if(props.userInfo.status){
                        setLike(!like)
                    }else{
                        Message.info({ content: '收藏需要登录哦！', showIcon: true, position: 'bottom' })
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
