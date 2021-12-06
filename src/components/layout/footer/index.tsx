import React from 'react';
import { Layout, Button } from '@arco-design/web-react';
import { IconMenu, IconUp } from '@arco-design/web-react/icon';
import PlayMode from './play-mode';
import PlayVolume from './play-volume';
import PlayControl from './play-control';
import Song from './song';
// import { Link } from 'react-router-dom';
import './index.less';

const Foot = Layout.Footer;

const Footer = () => {
    return (
        <Foot className="layout-footer">
            <Song picture="src\assets\zjl.jpg" songName="songName" singer="singer" isCollected="true" />
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
        // <Link to='/PlayList'>
        <div className="footer-menu-btn">
            <Button title="播放列表">
                <IconMenu style={{ fontSize: 26 }} />
            </Button>
        </div>
        // </Link>
    );
};

const WordsOfSong = () => {
    return (
        // <Link to='/WordsOfSong'>
        <div className="footer-up-btn">
            <Button title="歌词">
                <IconUp style={{ fontSize: 26 }} />
            </Button>
        </div>
        // </Link>
    );
};

export default Footer;
