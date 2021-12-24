import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconHeart } from '@arco-design/web-react/icon';
import { Track } from 'src/components/track-list';
import { IMusic } from 'src/api/types/song';

import './index.less';

interface SongMsg {
    song:IMusic;
    isCollected:boolean;
}

const Song = (props: SongMsg) => {
    const {song,isCollected}=props
    return (
        <div className="current-song">
            <Track album={song} hoverable={false}/>
            <Button
                className="like-btn"
                title="收藏"
            >
                {isCollected === true ? (
                    <IconHeart style={{ fontSize: 20, color: 'red' }} />
                ) : (
                    <IconHeart style={{ fontSize: 20 }} />
                )}
            </Button>
        </div>
    );
};

export default Song;
