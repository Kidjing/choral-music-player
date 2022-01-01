import React from 'react';
import { Layout, Button, Grid } from '@arco-design/web-react';
import { IconMenu, IconUp } from '@arco-design/web-react/icon';
import PlayMode from './play-mode';
import PlayVolume from './play-volume';
import PlayControl from './play-control';
import Song from './song';
import './index.less';
import { connect } from 'react-redux';

const Foot = Layout.Footer;

const Row = Grid.Row;
const Col = Grid.Col;

const Footer = (props: any) => {
    return (
        <Foot className="layout-footer">
            <Row className="controls">
                <Col span={8}>
                    <Song isCollected={false} song={props.song.songlist[0]} />
                </Col>
                <Col className="middle-control-buttons" span={8}>
                    <PlayControl />
                </Col>
                <Col className="right-control-buttons" span={8}>
                    <Button className="footer-btn" title="播放列表">
                        <IconMenu style={{ fontSize: 20}} />
                    </Button>
                    <PlayMode />
                    <PlayVolume />
                    <WordsOfSong />
                </Col>
            </Row>
        </Foot>
    );
};

const WordsOfSong = () => {
    return (
        <div>
            <Button className="footer-btn" title="歌词">
                <IconUp style={{ fontSize: 20}} />
            </Button>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        song: state.musicReducer,
    };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
