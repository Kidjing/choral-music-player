import React from 'react';
import { Button, Message, Space } from '@arco-design/web-react';
import { IconHeart } from '@arco-design/web-react/icon';
import { Track } from 'src/components/track-list';
import { IMusic, IArtistItem } from 'src/api/types/song';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.less';

interface SongMsg {
    song: IMusic;
    isCollected: boolean;
    detail: boolean;
}

const Song = (props: any) => {
    const { song, isCollected, detail } = props.own
    const [like, setLike] = React.useState<boolean>(isCollected)
    const navigate = useNavigate()
    const clickImg = (event: any) => {
        navigate('/album?id=' + song.al.id)
        event.stopPropagation();
    }

    const clickTitle = (event: any, id: number) => {
        navigate('/artist?id=' + id)
        event.stopPropagation();
    }
    return (
        <div >
            <div >
                {
                    detail ?
                        <div className="current-song" >
                            <Track album={song} hoverable={false} />
                            <Button
                                onClick={() => {
                                    if (props.userInfo.status) {
                                        setLike(!like)
                                    } else {
                                        Message.info({ content: '收藏需要登录哦！', showIcon: true, position: 'bottom' })
                                    }
                                }}
                                className="like-btn"
                                title="收藏"
                            >
                                {like === true ? (
                                    <IconHeart style={{ fontSize: 20, color: 'red' }} />
                                ) : (
                                    <IconHeart style={{ fontSize: 20 }} />
                                )}
                            </Button>
                        </div>
                        : <div className="detail-song" >
                            <div className='detail-img-name'>
                                <Space direction='vertical'>
                                    <img className='detail-img' src={song.al.picUrl + '?param=500y500'} loading='lazy' onClick={(event) => clickImg(event)} />
                                    <div className="detail-title"><a onClick={() => {navigate('/song?id=' + song.id)}}>{song.name}</a></div>
                                    <div className="detail-subtitle">
                                        {song.ar.map((item: IArtistItem, index: number) => {
                                            if (index === song.ar.length - 1) {
                                                return <a onClick={(event) => clickTitle(event, item.id)}>{item.name} </a>;
                                            } else {
                                                return <a onClick={(event) => clickTitle(event, item.id)}>{item.name},</a>;
                                            }
                                        })}
                                    </div>
                                </Space>
                            </div>
                        </div>
                }
            </div>

        </div>
    );
};

const mapStateToProps = (state: any, own: SongMsg) => {
    return {
        userInfo: state.userInfoReducer,
        own,
    };
};

export default connect(mapStateToProps)(Song);
