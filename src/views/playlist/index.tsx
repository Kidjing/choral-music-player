import { MusicTable,CommonCard, TextModal } from 'src/components';
import React, { useEffect } from 'react';
import { Button, Space } from '@arco-design/web-react';
import { IconHeart, IconCaretRight, IconPause} from '@arco-design/web-react/icon';
import './index.less';
import { getPlaylistDetail } from 'src/api/songlist';
import { ISonglistDetail,ITrackId } from 'src/api/types/songlist'
import { dateTrans } from 'src/utils/timetrans'
import { IMusic } from 'src/api/types/song'
import { getSongDetail } from 'src/api/song'
import { useSearchParams, useNavigate } from 'react-router-dom';

const Table = (props:{ids:ITrackId[]|undefined}) =>{
    const trackIds = props.ids
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
            <MusicTable type="playlist" data={songs?.songs} />
        </div>
    )
}

const Playlist=()=>{
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    let id:number
    const [list, setList] = React.useState<ISonglistDetail>()
    const [heart, setHeart] = React.useState<boolean>(false)
    const [play, setPlay] = React.useState<boolean>(false)
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
            <div className='list-msg'>
                <div className='list-img'
                    onClick={()=>{navigate('/playlist/?id=' + list?.id);}}
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
                    <p>
                        <TextModal 
                            desc={String(list?.description)} 
                        />
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
                    <Space size='large'>
                        <Button style={{marginLeft:20,backgroundColor:'transparent'}} title='收藏'>
                            {heart? (
                                <IconHeart onClick={()=>{setHeart(!heart)}} style={{fontSize:26,color:'red'}}/>
                            ):(
                                <IconHeart onClick={()=>{setHeart(!heart)}} style={{fontSize:26}}/>
                            )}
                        </Button>
                    </Space>
                </div>
            </div>
            <Table ids={list?.trackIds} />
        </div>
    )
}

export default Playlist;
