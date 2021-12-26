import { Comment, CommonCard } from 'src/components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getMusicComment } from 'src/api/comment'
import { CommentsRequest, CommentsResponce } from 'src/api/types/comment'
import { getLyricBySongID, getSongDetail } from 'src/api/song'
import { ICreator } from 'src/api/types/user'
import { ILyric } from 'src/api/types/lyric';
import { IMusic, IArtistItem } from "src/api/types/song";
import { Button, Space, Message, Pagination } from '@arco-design/web-react';
import { IconCaretRight, IconPause, IconHeart } from '@arco-design/web-react/icon';
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
    const [hotComment, setHotComment] = React.useState<CommentsResponce>();
    const [hotsort, setSort] = React.useState<boolean>(true);
    const [all, setAll] = React.useState<boolean>(false)
    const [offset, setOffset] = React.useState<number>(0)
    const [current, setCurrent] = React.useState<number>(1)
    let id:number;
    let ids:number[];
    let request:CommentsRequest = {id:0};
    useEffect(()=>{
        id = Number(searchParams.get('id'));
        ids = [id];
        request.id = id!==undefined?id:0
        request.limit = 10
        request.offset = offset
        getLyricBySongID(id).then(res =>{
            setLyric(res);
        });
        getSongDetail(ids).then(res=>{
            setMsg(res);
        });
        getMusicComment(request).then(res =>{
            setComment(res);
        });
        request.offset = 0
        getMusicComment(request).then(res =>{
            setHotComment(res);
        });
    },[searchParams,offset]);
    let lyrics:string[] = [];
    let lyricss:string[] = [];
    if(lyric!==undefined){
        lyrics = lyric.lrc.lyric.split('\n');
        for(let i=0; i<11 && i<lyrics.length; i++){
            lyricss.push(lyrics[i]);
        }
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
            {(msg!==undefined&&lyric!==undefined&&comment!==undefined&&hotComment!==undefined)?(
                <div>
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
                                        <a href='#comment'>{'评论('}{comment?.total}{')'}</a>
                                    </Button>
                                </Space>
                                <Space size='large' style={{marginLeft:10}}>
                                    <Button style={{backgroundColor:'transparent'}} onClick={()=>{
                                        if(props.userInfo.status){
                                            setHeart(!heart);
                                        }else{
                                            Message.info({ content: '收藏需要先登录哦！', showIcon: true, position: 'top' })
                                        }
                                    }}
                                    >
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
                            {all?(
                                <div>
                                    {lyrics.map((str,index)=>{
                                        return(
                                            <p key={index}>{str.split(']',2)[1]}</p>
                                        )
                                    })}
                                </div>
                            ):(
                                <div>
                                    {lyricss.map((str,index)=>{
                                        return(
                                            <p key={index}>{str.split(']',2)[1]}</p>
                                        )
                                    })}
                                </div>
                            )}
                            <Button size='mini' onClick={()=>{setAll(!all)}}>{all?'收回':'显示全部'}</Button>
                        </div>
                    </div>
                    <div className='song-comment'>
                        <h1 id='comment'>评 论</h1>
                        {hotsort?(
                            <div className='sort'>
                                <Button type='primary' onClick={()=>{setSort(true)}}>
                                        热评
                                </Button>
                                <Button onClick={()=>{setSort(false)}}>
                                        最新评论
                                </Button>
                            </div>
                        ):(
                            <div className='sort'>
                                <Button onClick={()=>{setSort(true)}}>
                                    热评
                                </Button>
                                <Button type='primary' onClick={()=>{setSort(false)}}>
                                    最新评论
                                </Button>
                            </div>
                        )}
                        {comment!==undefined?(
                            <div>
                                {hotsort?(
                                    <Comment sort={true} commentList={hotComment.hotComments} creator={creator} status={props.userInfo.status}/>
                                ):(
                                    <div>
                                        <Comment sort={false} commentList={comment.comments} creator={creator} status={props.userInfo.status}/>
                                        <Pagination total={(hotComment.total<5000?hotComment.total:5000)} current={current} onChange={(pageNumber)=>{
                                            setOffset((pageNumber-1)*10)
                                            setCurrent(pageNumber)
                                        }}
                                        />
                                    </div>
                                )}
                            </div>
                        ):(
                            <div>加载中</div>
                        )}
                        {hotsort === true ?(
                            <p>{hotComment.hotComments.length===0?'暂无热评':null}</p>
                        ):null}
                    </div>
                </div>
            ):(
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
