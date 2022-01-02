import React, { useEffect, useRef, useState } from 'react';
import { Layout, Button, Grid } from '@arco-design/web-react';
import { IconMenu, IconUp } from '@arco-design/web-react/icon';
import PlayMode from './play-mode';
import PlayVolume from './play-volume';
import PlayControl from './play-control';
import AudioPlay from './audio-play';
import SongDetail from './song-detail';
import Song from './song';
import './index.less';
import { connect } from 'react-redux';
import { setCurrentMusic } from 'src/store/current-music/reducer';

const Foot = Layout.Footer;

const Row = Grid.Row;
const Col = Grid.Col;

const Footer = (props: any) => {
    let audioRef = useRef(new Audio());
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (props.status) {
            props.changeStatus();
        }
    }, [])
    useEffect(()=>{
        let index = props.index;
        if (props.playMode === 'PLAY_IN_RANDOM') {
            index = props.seq[index]
        }
        props.setCurrentMusic(props.songlist[index])
    },[props.songlist,props.seq,props.index])
    return (
        // 第一次登录的时候不显示底部的栏
        <div>
            {props.id !== -2 ?
                <Foot className="layout-footer">
                    <AudioPlay audioRef={audioRef} />
                    <Row className="controls">
                        <Col span={8}>
                            <Song isCollected={false} song={props.currentMusic} detail={true}
                            />
                        </Col>
                        <Col className="middle-control-buttons" span={8}>
                            <PlayControl detail={false}/>
                        </Col>
                        <Col className="right-control-buttons" span={8}>
                            <Button className="footer-btn" title="播放列表" disabled={props.type === 'FM'}>
                                <IconMenu style={{ fontSize: 20 }} />
                            </Button>
                            <PlayMode />
                            <PlayVolume />
                            <div>
                                <Button className="footer-btn" title="歌词" onClick={() => setVisible(true)} >
                                    <IconUp style={{ fontSize: 20 }} />
                                </Button>
                                <SongDetail audioRef={audioRef} visible={visible} setVisible={setVisible}/>
                            </div>
                        </Col>
                    </Row>
                </Foot>
                : null}
        </div>

    );
};


const mapStateToProps = (state: any) => {
    return {
        songlist: state.musicReducer.songlist,
        index: state.playingReducer.playlistIndex,
        id: state.playingReducer.playlistId,
        playMode: state.playingReducer.playMode,
        
        seq: state.musicReducer.seq,
        status: state.musicStatusReducer,
        currentMusic: state.currentMusicReducer,
        type: state.playingReducer.playlistType,
    };
};

const mapDispatchToProps = {
    setCurrentMusic,
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
