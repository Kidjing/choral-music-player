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
    const song = props.playMode === 'PLAY_IN_RANDOM' ? props.songlist[props.seq[props.index]] : props.songlist[props.index]
    return (
        // 第一次登录的时候不显示底部的栏
        <div>
            {props.id !== -2 ?
                <Foot className="layout-footer">
                    <AudioPlay audioRef={audioRef} />
                    <Row className="controls">
                        <Col span={8}>
                            <Song isCollected={false} song={song} detail={true}
                            />
                        </Col>
                        <Col className="middle-control-buttons" span={8}>
                            <PlayControl detail={false}/>
                        </Col>
                        <Col className="right-control-buttons" span={8}>
                            <Button className="footer-btn" title="播放列表">
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
        playMode: state.musicReducer.seq,
        seq: state.musicReducer.seq,
        status: state.musicStatusReducer,
    };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
