import { MusicTable,CommonCard, TextModal } from 'src/components';
import React, { useEffect } from 'react';
import { Button, Space, Message } from '@arco-design/web-react';
import { IconHeart, IconCaretRight, IconPause,IconHeartFill} from '@arco-design/web-react/icon';
import './index.less';
import { getPlaylistDetail } from 'src/api/songlist';
import { ISonglistDetail,ITrackId } from 'src/api/types/songlist'
import { dateTrans } from 'src/utils/timetrans'
import { IMusic } from 'src/api/types/song'
import { getSongDetail } from 'src/api/song'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Table = (props:{ids:ITrackId[]|undefined,status:boolean}) =>{
    const trackIds = props.ids
    const status = props.status
    let ids:number[] = []
    const [songs, setSongs] = React.useState<{songs:IMusic[]}>()
    useEffect(()=>{
        if(trackIds !== undefined){
            let trackId:ITrackId
            for(trackId of trackIds){
                ids.push(trackId.id)
            }
        }
        getSongDetail(ids).then(res=>{
            setSongs(res)
        })
    },[trackIds])
    return(
        <div className='table'>
            <MusicTable type="playlist" data={songs?.songs} status={status} />
        </div>
    )
}

const Playlist=(props:any)=>{
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    let id:number;
    const [list, setList] = React.useState<ISonglistDetail>();
    const [heart, setHeart] = React.useState<boolean>(false);
    const [play, setPlay] = React.useState<boolean>(false);
    useEffect(()=>{
        id = Number(searchParams.get('id'))
        getPlaylistDetail(id).then(res =>{
            setList(res);
        })
    },[searchParams])
    let date = ''
    if(list?.createTime !== undefined){
        date = dateTrans(list?.createTime)
    }
    return(
        <div className='list'>
            {list!==undefined?(
                <div className='list'>
                    <div className='list-msg'>
                        <div className='list-img'
                            onClick={()=>{navigate('/playlist?id=' + list?.id);}}
                        >
                            <CommonCard
                                imgSrc={list?.coverImgUrl as string}
                                title=""
                                shape="round"
                                textPostion="left"
                            />
                        </div>
                        <div className='list-detail'>
                            <h1>{list?.name}</h1>
                            <p>最后更新于{date}</p>
                            <p>{list?.trackCount}首歌</p>
                            <div>
                                {list.description !== null?(
                                    <TextModal 
                                        desc={String(list?.description)} 
                                        title='歌单介绍'
                                        
                                    />
                                ):(
                                    ' '
                                )}
                            </div>
                            <Space size='large'>
                                {play?(
                                    <Button
                                        onClick={()=>{setPlay(!play)}}
                                        className='btn'
                                        icon={<IconPause />}
                                    > 
                                        暂停
                                    </Button>
                                ):(
                                    <Button
                                        onClick={()=>{setPlay(!play)}} 
                                        className='btn'
                                        icon={<IconCaretRight />}
                                    > 
                                        播放
                                    </Button>
                                )}
                                <Button title='收藏'
                                    className='btn'
                                >
                                    {heart? (
                                        <IconHeartFill onClick={()=>{
                                            if(props.userInfo.status){
                                                setHeart(!heart)
                                            }else{
                                                Message.info({ content: '收藏需要先登录哦!', showIcon: true, position: 'top' })
                                            }
                                        }} style={{fontSize:26,color:'red'}}/>
                                    ):(
                                        <IconHeart onClick={()=>{
                                            if(props.userInfo.status){
                                                setHeart(!heart)
                                            }
                                        }} style={{fontSize:26,color:'red'}}/>
                                    )}
                                </Button>
                            </Space>
                        </div>
                    </div>
                    <Table ids={list?.trackIds} status={props.userInfo.status} />
                </div>
            ):(
                null
            )}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(Playlist);
