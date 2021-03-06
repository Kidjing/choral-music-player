import { Comment, CommonCard, PlayButton } from 'src/components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getMusicComment } from 'src/api/comment'
import { CommentsRequest, CommentsResponce } from 'src/api/types/comment'
import { getLyricBySongID, getSongDetail } from 'src/api/song'
import { ICreator } from 'src/api/types/user'
import { ILyric } from 'src/api/types/lyric';
import { IMusic, IArtistItem } from "src/api/types/song";
import { Button, Space, Message, Pagination } from '@arco-design/web-react';
import { IconHeart, IconHeartFill } from '@arco-design/web-react/icon';
import { connect } from 'react-redux';
import './index.less';

const Song = (props: any) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [lyric, setLyric] = React.useState<ILyric>();
    const [msg, setMsg] = React.useState<{ songs: IMusic[] }>();
    const [heart, setHeart] = React.useState<boolean>(false);
    const [comment, setComment] = React.useState<CommentsResponce>();
    const [hotComment, setHotComment] = React.useState<CommentsResponce>();
    const [hotsort, setSort] = React.useState<boolean>(true);
    const [offset, setOffset] = React.useState<number>(0)
    const [current, setCurrent] = React.useState<number>(1)
    let id = Number(searchParams.get('id'));;
    let ids: number[];
    let request: CommentsRequest = { id: 0 };
    useEffect(() => {
        id = Number(searchParams.get('id'));
        ids = [id];
        request.id = id !== undefined ? id : 0
        request.limit = 10
        request.offset = offset
        getLyricBySongID(id).then(res => {
            setLyric(res);
        });
        getSongDetail(ids).then(res => {
            setMsg(res);
        });
        getMusicComment(request).then(res => {
            setComment(res);
        });
        request.offset = 0
        getMusicComment(request).then(res => {
            setHotComment(res);
        });
    }, [searchParams, offset]);
    let lyrics: string[] = [];
    let lyricss: string[] = [];
    if (lyric !== undefined) {
        lyrics = lyric.lrc.lyric.split('\n');
        for (let i = 0; i < 11 && i < lyrics.length; i++) {
            lyricss.push(lyrics[i]);
        }
    }
    let creator: ICreator;
    if (props.userInfo.status) {
        creator = {
            userId: props.userInfo.userId,
            avatarUrl: props.userInfo.avatarUrl,
            nickname: props.userInfo.nickname,
        }
    } else {
        creator = {
            userId: 409041521,
            nickname: '',
            avatarUrl: 'https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60',
        }
    }
    return (
        <div className='song'>
            {(msg !== undefined && lyric !== undefined && comment !== undefined && hotComment !== undefined) ? (
                <div>
                    <div className='song-detail'>
                        <div className='song-detail-msg'>
                            <div className='song-detail-img' onClick={() => { navigate('/song?id=' + msg?.songs[0].id) }}>
                                <CommonCard
                                    imgSrc={msg?.songs[0].al.picUrl as string}
                                    shape="circle"
                                    textPostion="center"
                                />
                            </div>
                            <div className='song-msg'>
                                <h2>{msg?.songs[0].name}</h2>
                                <p >
                                    {'??????: '}
                                    {msg?.songs[0].ar.map((item: IArtistItem, index: number) => {
                                        if (index === msg.songs[0].ar.length - 1) {
                                            return <u onClick={() => { navigate('/artist?id=' + msg?.songs[0].ar[index].id) }}>{item.name} </u>;
                                        } else {
                                            return <u onClick={() => { navigate('/artist?id=' + msg?.songs[0].ar[index].id) }}>{item.name},</u>;
                                        }
                                    })}
                                </p>
                                <p onClick={() => { navigate('/album?id=' + msg?.songs[0].al.id) }}>
                                    ????????????: <u>{msg?.songs[0].al.name}</u>
                                </p>
                                <Space size='large'>
                                    <PlayButton id={id} type='song'/>
                                    <Button title='??????'
                                        className='btn'
                                    >
                                        {heart ? (
                                            <IconHeartFill onClick={() => {
                                                if (props.userInfo.status) {
                                                    setHeart(!heart)
                                                } else {
                                                    Message.info({ content: '????????????????????????!', showIcon: true, position: 'top' })
                                                }
                                            }} style={{ fontSize: 26, color: 'red' }} />
                                        ) : (
                                            <IconHeart onClick={() => {
                                                if (props.userInfo.status) {
                                                    setHeart(!heart)
                                                } else {
                                                    Message.info({ content: '????????????????????????!', showIcon: true, position: 'top' })
                                                }
                                            }} style={{ fontSize: 26, color: 'red' }} />
                                        )}
                                    </Button>
                                </Space>
                            </div>
                        </div>
                        <div className='outer'>
                            <div className='lyric'>
                                <h1>{msg?.songs[0].name}</h1>
                                <div className='container'>
                                    {lyrics.map((str, index) => {
                                        return (
                                            <p key={index}>{str.split(']', 2)[1]}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='song-comment'>
                        <h1 id='comment'>??? ???</h1>
                        <div>
                            {hotsort ? (
                                <Comment setSort={setSort} sort={true} commentList={hotComment.hotComments} creator={creator} status={props.userInfo.status} />
                            ) : (
                                <div>
                                    <Comment setSort={setSort} sort={false} commentList={comment.comments} creator={creator} status={props.userInfo.status} />
                                    <div >
                                        <Pagination total={(hotComment.total < 1000 ? hotComment.total : 1000)}
                                            size='large' current={current}
                                            className='page'
                                            onChange={(pageNumber) => {
                                                setOffset((pageNumber - 1) * 10)
                                                setCurrent(pageNumber)
                                            }}
                                        />
                                    </div>

                                </div>
                            )}
                        </div>
                        {hotsort === true ? (
                            <p>{hotComment.hotComments.length === 0 ? '????????????' : null}</p>
                        ) : null}
                    </div>
                </div>
            ) : (
                null
            )}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(Song);
