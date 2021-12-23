import React from 'react';
import { Layout, Button } from '@arco-design/web-react';
import { IconMenu, IconUp } from '@arco-design/web-react/icon';
import PlayMode from './play-mode';
import PlayVolume from './play-volume';
import PlayControl from './play-control';
import Song from './song';
import './index.less';

const Foot = Layout.Footer;

const Footer = () => {
    return (
        <Foot className="layout-footer">
            <Song isCollected='' picture="" songName="songName" singer="singer" />
            <PlayControl />
            <PlayList />
            <PlayMode />
            <PlayVolume />
            <WordsOfSong />
        </Foot>
    );
};

const PlayList = () => {
    return (
        <div>
            <Button className="footer-btn" title="播放列表">
                <IconMenu style={{ fontSize: 26, backgroundColor:'transparent' }} />
            </Button>
        </div>
    );
};

const WordsOfSong = () => {
    return (
        <div>
            <Button className="footer-btn" title="歌词">
                <IconUp style={{ fontSize: 26, backgroundColor:'transparent' }} />
            </Button>
        </div>
    );
};

export default Footer;
