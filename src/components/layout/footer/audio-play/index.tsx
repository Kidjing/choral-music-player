import React, { useEffect, useRef, useState } from 'react';
import { Slider } from '@arco-design/web-react';
import { connect } from 'react-redux';
import { checkMusicPlay, getMusicUrl } from 'src/api/song'
import { changeStatus, changePlaylistIndex } from 'src/store/playing/reducer'


const AudioPlay = (props: any) => {

    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>();
    const audioRef = useRef(new Audio());
    const [processTime, setProcessTime] = useState(0)
    const [max, setMax] = useState(100)

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
            setMax(audioRef.current.duration);
            // 通过判断这个的循环类型来做出判断
            if (audioRef.current.ended) {
                if (props.playing.playMode === 'PLAY_IN_SINGLE') {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                } else {
                    props.changePlaylistIndex(0, props.song.seq)
                }
            }
        }, 300)
        intervalRef.current = id
        return () => {
            clearInterval(intervalRef.current!)
        }
    }, [])


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
                    audioRef.current.src = res[0].url
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
        <div>
            <Slider value={processTime} onChange={changeProcess} max={max}
                style={{ width: '100%' }} formatTooltip={formatTooltip} />
        </div>
    );
};



const mapStateToProps = (state: any) => {
    return {
        song: state.musicReducer,
        playing: state.playingReducer,
        status: state.musicStatusReducer,
    };
};

const mapDispatchToProps = {
    changeStatus,
    changePlaylistIndex,
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlay);
