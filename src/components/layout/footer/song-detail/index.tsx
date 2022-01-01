import React, { useEffect, useRef, useState } from 'react';
import { Slider, Drawer, Grid, Typography, Space } from '@arco-design/web-react';
import { connect } from 'react-redux';
import { checkMusicPlay, getMusicUrl } from 'src/api/song'
import { changeStatus, changePlaylistIndex } from 'src/store/playing/reducer'
import Song from '../song';
import { usePalette } from 'color-thief-react';
import PlayControl from '../play-control'

import './index.less'


const Row = Grid.Row;
const Col = Grid.Col;

interface IProps {
    audioRef: React.MutableRefObject<HTMLAudioElement>,
    visible: boolean,
    setVisible: Function,
}

const SongDetail = (props: any) => {

    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>();



    const { audioRef, visible, setVisible } = props.ownProps;
    const [processTime, setProcessTime] = useState(0)
    const [max, setMax] = useState(100)

    const song = props.playMode === 'PLAY_IN_RANDOM' ? props.songlist[props.seq[props.index]] : props.songlist[props.index]

    const { data } = usePalette(song.al.picUrl+'?param=200y200', 2, 'hex', { crossOrigin: 'anonymous' });


    const formatTooltip = (val: number) => {
        let str = String(val % 60)
        if (val % 60 < 10) {
            str = '0' + str
        }
        return <span>{`${Math.floor(val / 60)}:${str}`}</span>
    }
    const changeProcess = (val: any) => {
        setProcessTime(val);
        audioRef.current.currentTime = val
    }

    useEffect(() => {
        const id = setInterval(() => {
            setProcessTime(Math.floor(audioRef.current.currentTime));
            setMax(Math.floor(audioRef.current.duration));
            // 通过判断这个的循环类型来做出判断
            if (audioRef.current.ended) {
                if (props.playing.playMode === 'PLAY_IN_SINGLE') {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                } else {
                    props.changePlaylistIndex(0, props.song.seq.length)
                }
            }
        }, 400)
        intervalRef.current = id
        return () => {
            clearInterval(intervalRef.current!)
        }
    }, [props.song])


    useEffect(() => {
        audioRef.current.volume = props.playing.volume / 100;
    }, [props.playing.volume]);

    useEffect(() => {
        if (props.status) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [props.status]);

    useEffect(() => {
        // 修改歌曲的URL
        let index = props.playing.playlistIndex;
        if (props.playing.playMode === 'PLAY_IN_RANDOM') {
            index = props.song.seq[index]
        }
        const id = props.song.songlist[index].id
        checkMusicPlay(id).then(res => {
            if (res.success) {
                getMusicUrl(id).then(res => {
                    audioRef.current.src = res[0].url.replace('http://', 'https://')
                    if (props.status) {
                        audioRef.current.play();
                    } else {
                        audioRef.current.pause();
                    }
                })
            }
        })
    }, [props.playing.playlistIndex, props.song])

    return (
        <div className='footer-slider'>
            <Drawer
                height='100%'
                title={null}
                footer={null}
                visible={visible}
                closable={false}
                placement='bottom'
                onOk={() => {
                    setVisible(false);
                }}
                onCancel={() => {
                    setVisible(false);
                }}
                className='footer-drawer'
                style={{ background: `linear-gradient(to top left, ${data?.[0]}, ${data?.[1]})` }}
            >
                <Row style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <div className='left'>
                            <Song isCollected={false} song={song} detail={false}
                            />
                            <Space>
                                <Typography.Text className='detail-text'>{formatTooltip(processTime)}</Typography.Text>
                                <Slider value={processTime} onChange={changeProcess} max={max}
                                    className='slider' tooltipVisible={false} />
                                <Typography.Text className='detail-text'>{formatTooltip(max)}</Typography.Text>
                            </Space>
                            <PlayControl detail={true}/>
                        </div>

                    </Col>
                    <Col span={12}>
                        <div className='right'>123</div>
                    </Col>
                </Row>

            </Drawer>
        </div>
    );
};



const mapStateToProps = (state: any, ownProps: IProps) => {
    return {
        songlist: state.musicReducer.songlist,
        index: state.playingReducer.playlistIndex,
        playMode: state.musicReducer.seq,
        seq: state.musicReducer.seq,

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
