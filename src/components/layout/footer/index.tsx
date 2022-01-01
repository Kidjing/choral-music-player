import React, { useEffect } from 'react';
import { Layout, Button, Grid } from '@arco-design/web-react';
import { IconMenu, IconUp } from '@arco-design/web-react/icon';
import PlayMode from './play-mode';
import PlayVolume from './play-volume';
import PlayControl from './play-control';
import AudioPlay from './audio-play';
import Song from './song';
import './index.less';
import { connect } from 'react-redux';

const Foot = Layout.Footer;

const Row = Grid.Row;
const Col = Grid.Col;

const Footer = (props: any) => {
    useEffect(() => {
        if (props.status) {
            props.changeStatus();
        }
    }, [])
    const song = props.playMode === 'PLAY_IN_RANDOM' ? props.songlist[props.seq[props.index]] : props.songlist[props.index]
    return (
        <div>
            {props.id !== -2 ?
                <Foot className="layout-footer">
                    <AudioPlay />
                    <Row className="controls">
                        <Col span={8}>
                            <Song isCollected={false} song={song}
                            />
                        </Col>
                        <Col className="middle-control-buttons" span={8}>
                            <PlayControl />
                        </Col>
                        <Col className="right-control-buttons" span={8}>
                            <Button className="footer-btn" title="播放列表">
                                <IconMenu style={{ fontSize: 20 }} />
                            </Button>
                            <PlayMode />
                            <PlayVolume />
                            <WordsOfSong />
                        </Col>
                    </Row>
                </Foot>
                : null}
        </div>

    );
};

const WordsOfSong = () => {
    return (
        <div>
            <Button className="footer-btn" title="歌词">
                <IconUp style={{ fontSize: 20 }} />
            </Button>
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
