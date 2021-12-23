import { Comment, CommonCard } from 'src/components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getMusicComment } from 'src/api/comment'
import { CommentsRequest } from 'src/api/types/comment'
import { CommentsResponce } from 'src/api/types/comment'
import { getLyricBySongID, getSongDetail } from 'src/api/song'
import { ICreator, UserInfo } from 'src/api/types/user'
import { ILyric } from 'src/api/types/lyric';
import { IMusic } from "src/api/types/song";
import { IArtistItem } from "src/api/types/song"
import { Button, Space } from '@arco-design/web-react';
import { IconCaretRight, IconPause, IconHeart} from '@arco-design/web-react/icon';
import { connect } from 'react-redux';
import './index.less';

const Song = (props:any) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [lyric, setLyric] = React.useState<ILyric>();
    const [msg, setMsg] = React.useState<{songs:IMusic[]}>();
    const [heart, setHeart] = React.useState<boolean>(false);
    const [play, setPlay] = React.useState<boolean>(false);
    const [comment, setComment] = React.useState<CommentsResponce>();
    const [hotsort, setSort] = React.useState<boolean>(true);
    let id:number;
    let ids:number[];
    let request:CommentsRequest = {id:0};
    useEffect(()=>{
        id = Number(searchParams.get('id'));
        ids = [id];
        request.id = id!==undefined?id:0
        getLyricBySongID(id).then(res =>{
            setLyric(res);
        });
        getSongDetail(ids).then(res=>{
            setMsg(res);
        });
        getMusicComment(request).then(res =>{
            setComment(res);
        });
    },[searchParams]);
    let lyrics:string[] = [];
    if(lyric!==undefined){
        lyrics = lyric.lrc.lyric.split('\n');
    }
    let creator:ICreator;
    if(props.userInfo.status){
        creator = {
            userId:props.userInfo.userId,
            avatarUrl:props.userInfo.avatarUrl,
            nickname:props.userInfo.nickname,
        }
    }else{
        creator = {
            userId: 409041521,
            nickname: '嘟噜o匈',
            avatarUrl: 'https://p1.music.126.net/4cA7-y3r_aUqC5k8RUZImQ==/19057835044640063.jpg',
        }
    }
    return (
        <div className='song'>
            <div className='song-detail'>
                <div className='song-detail-msg'>
                    <div className='song-detail-img' onClick={()=>{navigate('/song?id='+msg?.songs[0].id)}}>
                        <CommonCard
                            imgSrc={msg?.songs[0].al.picUrl as string}
                            shape="circle"
                            textPostion="center"
                        />
                    </div>
                    <div className='song-msg'>
                        <h2>{msg?.songs[0].name}</h2>
                        <p >
                            {'歌手: '}
                            {msg?.songs[0].ar.map((item: IArtistItem, index: number) => {
                                if (index === msg.songs[0].ar.length - 1) {
                                    return <u onClick={()=>{navigate('/artist?id='+msg?.songs[0].ar[index].id)}}>{item.name} </u>;
                                } else {
                                    return <u onClick={()=>{navigate('/artist?id='+msg?.songs[0].ar[index].id)}}>{item.name},</u>;
                                }
                            })}
                        </p>
                        <p onClick={()=>{navigate('/album?id='+msg?.songs[0].al.id)}}>
                            所属专辑: <u>{msg?.songs[0].al.name}</u>
                        </p>
                        <Space size='large'>
                            {play?(
                                    <Button
                                        onClick={()=>{setPlay(!play)}}
                                        type='primary' 
                                        icon={<IconPause />}
                                    > 
                                        暂停
                                    </Button>
                                ):(
                                    <Button
                                        onClick={()=>{setPlay(!play)}} 
                                        type='primary' 
                                        icon={<IconCaretRight />}
                                    > 
                                        播放
                                    </Button>
                            )}
                        </Space>
                        <Space size='large' style={{marginLeft:10}}>
                            <Button style={{backgroundColor:'transparent'}}>
                                <a href='#comment'>{'评论('}{(comment!==undefined&&comment.total<5000)?comment?.total:'>5000'}{')'}</a>
                            </Button>
                        </Space>
                        <Space size='large' style={{marginLeft:10}}>
                            <Button style={{backgroundColor:'transparent'}} onClick={()=>{setHeart(!heart)}} title={heart?'取消收藏':'收藏'}>
                                {heart? (
                                    <IconHeart style={{fontSize:26,color:'red'}}/>
                                ):(
                                    <IconHeart style={{fontSize:26}}/>
                                )}
                            </Button>
                        </Space>
                    </div>
                </div>
                <div className='lyric'>
                    <h1>{msg?.songs[0].name}</h1>
                    {lyrics.map(str=>{
                        return(
                            <p>{str.split(']',2)[1]}</p>
                        )
                    })}
                </div>
            </div>
            <div className='song-comment'>
                <h1 id='comment'>评 论</h1>
                {hotsort?(
                    <div className='sort' onClick={()=>{setSort(!hotsort)}}>
                        <Button type='primary'>
                            按热度排序
                        </Button>
                        <Button>
                            按时间排序
                        </Button>
                    </div>
                ):(
                    <div className='sort' onClick={()=>{setSort(!hotsort)}}>
                        <Button>
                            按热度排序
                        </Button>
                        <Button type='primary'>
                            按时间排序
                        </Button>
                    </div>
                )}
                {comment!==undefined?(
                    <div>
                        {hotsort?(
                            <Comment commentList={comment.hotComments} creator={creator} />
                        ):(
                            <Comment commentList={comment.comments} creator={creator} />
                        )}
                    </div>
                ):(
                    <div>加载中</div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(Song);
