import React, { useEffect, useRef, useState } from 'react';
import { Slider, Drawer, Grid, Typography, Button } from '@arco-design/web-react';
import { connect } from 'react-redux';
import { IconDown } from '@arco-design/web-react/icon';
import { changeStatus, changePlaylistIndex } from 'src/store/playing/reducer';
import Song from '../song';
import { usePalette } from 'color-thief-react';
import PlayControl from '../play-control';
import { useSearchParams } from 'react-router-dom';

import { getLyricBySongID } from 'src/api/song';
import { IFormatLyric } from 'src/api/types/lyric';
import { formatLyric } from 'src/utils/formatLyric';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

interface IProps {
    audioRef: React.MutableRefObject<HTMLAudioElement>;
    visible: boolean;
    setVisible: Function;
}

const SongDetail = (props: any) => {
    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>();
    const { audioRef, visible, setVisible } = props.ownProps;
    const [processTime, setProcessTime] = useState(0);
    const [max, setMax] = useState(100);
    const [lyric, setLyric] = useState<IFormatLyric>();
    const [searchParams] = useSearchParams();
    const [index, setIndex] = useState(0);

    const { data } = usePalette(props.currentMusic.al.picUrl + '?param=200y200', 2, 'hex', { crossOrigin: 'anonymous' });

    const formatTooltip = (val: number) => {
        let str = String(val % 60);
        if (val % 60 < 10) {
            str = '0' + str;
        }
        return <span>{`${Math.floor(val / 60)}:${str}`}</span>;
    };

    const changeProcess = (val: any) => {
        setProcessTime(val);
        audioRef.current.currentTime = val;
    };

    useEffect(() => {
        if (visible) setVisible(false);
    }, [searchParams]);

    useEffect(() => {
        getLyricBySongID(props.currentMusic.id).then((res) => {
            setLyric(formatLyric(res));
        });
    }, [props.currentMusic]);

    useEffect(() => {
        const id = setInterval(() => {
            setProcessTime(Math.floor(audioRef.current.currentTime));
            if (!isNaN(audioRef.current.duration)) setMax(Math.floor(audioRef.current.duration));
        }, 200);
        intervalRef.current = id;
        return () => {
            clearInterval(intervalRef.current!);
        };
    }, [props.song]);

    useEffect(() => {
        const times = lyric?.lrc?.times;
        if (times) {
            times.every((item, id) => {
                if (id !== index) {
                    if (item <= processTime && (times[id + 1] !== undefined ? times[id + 1] > processTime : true)) {
                        const el = document.getElementById('line' + id);
                        if (el) {
                            el.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                            });
                            setIndex(id);
                            return false;
                        }
                    }
                }
                return true;
            });
        }
    }, [processTime]);

    return (
        <div className="footer-slider">
            <Drawer
                height="100%"
                title={null}
                footer={null}
                visible={visible}
                closable={false}
                placement="bottom"
                onOk={() => {
                    setVisible(false);
                }}
                onCancel={() => {
                    setVisible(false);
                }}
                className="footer-drawer"
                style={{ background: `linear-gradient(to top left, ${data?.[0]}, ${data?.[1]})` }}
            >
                <Row style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <div className="left">
                            <Song isCollected={false} song={props.currentMusic} detail={false} />
                            <Typography.Text className="detail-text-left">{formatTooltip(processTime)}</Typography.Text>
                            <Slider
                                value={processTime}
                                onChange={changeProcess}
                                max={max}
                                className="slider"
                                tooltipVisible={false}
                            />
                            <Typography.Text className="detail-text-right">{formatTooltip(max)}</Typography.Text>
                            <PlayControl detail={true} />
                        </div>
                    </Col>
                    <Col span={11}>
                        <div className="center">
                            {lyric && (
                                <div className="lyric">
                                    {lyric?.lrc?.contents.map((item, id) => {
                                        return (
                                            <div
                                                key={id}
                                                className="line"
                                                id={'line' + id}
                                                onClick={() => {
                                                    const times = lyric?.lrc?.times;
                                                    if (times) {
                                                        setProcessTime(times![id]);
                                                        audioRef.current.currentTime = times![id];
                                                    }
                                                }}
                                            >
                                                <span className={id === index ? 'span-play' : 'span-unplay'}>
                                                    {item}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col span={1}>
                        <div className="right">
                            <Button className="play-control-btn-white" onClick={() => setVisible(false)}>
                                <IconDown className="icon" />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Drawer>
        </div>
    );
};

const mapStateToProps = (state: any, ownProps: IProps) => {
    return {
        currentMusic: state.currentMusicReducer,

        song: state.musicReducer,
        playing: state.playingReducer,
        status: state.musicStatusReducer,
        ownProps,
    };
};

const mapDispatchToProps = {
    changeStatus,
    changePlaylistIndex,
};
export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);
