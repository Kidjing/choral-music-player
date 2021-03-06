import { Button } from '@arco-design/web-react';
import { usePalette } from 'color-thief-react';
import { IArtistItem } from '../../api/types/song';
import { IconThumbDown, IconPlayArrow, IconPause, IconSkipNext } from '@arco-design/web-react/icon';
import { connect } from 'react-redux';
import { getFm } from 'src/store/fm-card/reducer';
import { trashPersonalFM } from 'src/api/songlist';
import { changeStatus, playMusic, setPlaylistInfo } from 'src/store/playing/reducer';
import './index.less';

const FmCard = (props: any) => {
    const currentFm = props.personalFm[0];

    const { data } = usePalette(currentFm.album.picUrl + '?param=40y40', 2, 'hex', { crossOrigin: 'anonymous' });

    const getNext = () => {
        props.getFm(props.userInfo);
    };
    const trashFm = (id: number) => {
        trashPersonalFM(id)
            .then((res) => {
                if (res) {
                    props.getFm(props.userInfo);
                }
            })
            .catch();
    };

    const setPlay = () => {
        if (props.playing.playlistType === 'FM') {
            props.changeStatus();
        } else {
            if (!props.status) {
                props.changeStatus();
            }
            props.setPlaylistInfo(-1, 'FM');
        }
    };



    return (
        <div className="fm-card" style={{ background: `linear-gradient(to top left, ${data?.[0]}, ${data?.[1]})` }}>
            <img className="fm-card-cover" src={currentFm.album.picUrl + '?param=300y300'} />
            <div className="fm-card-right">
                <div className="info">
                    <div className="title">{currentFm.name}</div>
                    <div className="artist">
                        {currentFm.artists.map((item: IArtistItem, index: number) => {
                            if (index === currentFm.artists.length - 1) {
                                return <a href={'/?artist=' + item.id}>{item.name} </a>;
                            } else {
                                return <a href={'/?artist=' + item.id}>{item.name},</a>;
                            }
                        })}
                    </div>
                </div>
                <div className="control">
                    <div className="buttons">
                        <Button
                            className="btn"
                            onClick={() => trashFm(currentFm.id)}
                            icon={<IconThumbDown style={{ width: '100%', height: '100%' }} />}
                        />
                        <Button
                            className="btn"
                            onClick={() => {
                                setPlay();
                            }}
                        >
                            {props.status && props.playing.playlistType === 'FM' ? (
                                <IconPause style={{ width: '100%', height: '100%' }} />
                            ) : (
                                <IconPlayArrow style={{ width: '100%', height: '100%' }} />
                            )}
                        </Button>
                        <Button
                            className="btn"
                            onClick={getNext}
                            icon={<IconSkipNext style={{ width: '100%', height: '100%' }} />}
                        />
                    </div>
                    <div className="card-name">??????FM</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
        personalFm: state.personalFmReducer,
        playing: state.playingReducer,
        status: state.musicStatusReducer,
    };
};

const mapDispatchToProps = {
    getFm,
    changeStatus,
    playMusic,
    setPlaylistInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(FmCard);
