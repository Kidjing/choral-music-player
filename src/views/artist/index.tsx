import { CommonCard } from 'src/components';
import React, { useEffect } from 'react';
import { Button, Space, Grid } from '@arco-design/web-react';
import {  IconCaretRight} from '@arco-design/web-react/icon';
import { getArtistDetail } from 'src/api/artist'
import { IArtist } from 'src/api/types/artist'
import { IMusic } from 'src/api/types/song'
import { useSearchParams, useNavigate} from 'react-router-dom';
import { getArtistAlbum } from 'src/api/album'
import { IAlbum } from 'src/api/types/album'
import { dateTrans } from 'src/utils/timetrans'
import './index.less';

const Row = Grid.Row; 
const Col = Grid.Col;

const Artist = () =>{
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [artist, setArtist] = React.useState<{artist:IArtist;hotSongs:IMusic[]}>()
    const [albums, setAlbums] = React.useState<IAlbum[]>()
    let id:number
    useEffect(()=>{
        id = Number(searchParams.get('id'))
        getArtistDetail(id).then(res =>{
            setArtist(res);
        })
        getArtistAlbum(id).then(res=>{
            setAlbums(res)
        })
    },[searchParams])
    let i:number
    let albumNum = []
    if(albums !== undefined){
        for(i=0;i<albums?.length;i++){
            albumNum[i] = 1
        }
    }
    let songs = []
    if(artist !== undefined){
        for(i=0;i<artist?.hotSongs.length;i++){
            songs[i] = 1
        }
    }
    return(
        <div className='artist'>
            <div className='artist-msg'>
                <div className='artist-img'>
                    <CommonCard
                        imgSrc={(artist?.artist.picUrl !==undefined)?(artist.artist.picUrl):''}
                        title=""
                        shape="circle"
                        textPostion="left"
                    />
                </div>
                <div className='album-detail'>
                    <h1>{artist?.artist.name}</h1>  
                    <p>艺人</p>
                    <p>
                        <a style={{ color:'black'}} href='#hotSongs'>{artist?.artist.musicSize}首歌</a>
                         . <a style={{ color:'black'}} href='#album'>{artist?.artist.albumSize}专辑</a>
                         . {artist?.artist.mvSize}个MV
                    </p>
                    <p style={{width:500,height:87, overflow:'hidden',textOverflow:'ellipsis'}}>{artist?.artist.briefDesc}</p>
                    <Space style={{marginRight:20}} size='large'>
                        <Button type='primary' icon={<IconCaretRight />}> 播放</Button>
                    </Space>
                    <Space size='large'>
                        <Button type='primary'>关注</Button>
                    </Space>
                </div>
            </div>
            
            <div className='new'>
                <h2>最新发布</h2>
                <div className='new-album'>
                    <div onClick={()=>{navigate('/album/?id='+(albums !== undefined?(albums[0].id):0))}} className='new-album-img'>
                        <CommonCard
                            imgSrc={(albums?.[0].blurPicUrl !== undefined)?(String(albums[0].blurPicUrl)):''}
                            title=''
                            shape="round"
                            textPostion="left"
                        />
                    </div>
                    <div className='new-album-msg'>
                        <h3>{(albums!==undefined)?(albums[0].name):''}</h3>
                        <p>{dateTrans(Number(albums !== undefined?(albums[0].publishTime):0))}</p>
                        <p>{(albums !== undefined?(albums[0].size):0)}首歌</p>
                    </div>
                </div>
                <div className='new-album'>
                    <div onClick={()=>{navigate('/album/?id='+(albums !== undefined?(albums[1].id):0))}} className='new-album-img'>
                        <CommonCard
                            imgSrc={(albums?.[1].blurPicUrl !== undefined)?(String(albums[1].blurPicUrl)):''}
                            title=''
                            shape="round"
                            textPostion="left"
                        />
                    </div>
                    <div className='new-album-msg'>
                        <h3>{(albums!==undefined)?(albums[1].name):''}</h3>
                        <p>{dateTrans(Number(albums !== undefined?(albums[1].publishTime):0))}</p>
                        <p>{(albums !== undefined?(albums[1].size):0)}首歌</p>
                    </div>
                </div>
            </div>

            <div id='hotSongs'>
                <h2>热门歌曲</h2>
                <div className="index-row">
                    <Row gutter={[44, 24]}>
                        {songs.map((item, index) => {
                            return (
                                <Col key={index} span={6} >
                                    <div style={{height:40,width:200}}>
                                        <div onClick={()=>{navigate('/album/?id='+(artist?.hotSongs !== undefined?(artist?.hotSongs[index].al.id):0))}} style={{float:'left',marginRight:10}}>
                                            <CommonCard style={{height:40,width:40}}
                                                imgSrc={(artist?.hotSongs[index].al.picUrl !==undefined)?(artist.hotSongs[index].al.picUrl):''}
                                                title=''
                                                shape="round"
                                                textPostion="left"
                                                id = {artist?.hotSongs[index].al.id}
                                            />
                                        </div>
                                        <div>
                                            <h4 style={{height:20,width:120,overflow:'hidden',textOverflow:'ellipsis'}}>{artist?.hotSongs[index].name}</h4>
                                            <p style={{marginTop:-13,fontSize:'small'}}>{artist?.artist.name}</p>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>

            <div id='album'>
                <h2>专 辑</h2>
                <div className="index-row">
                    <Row gutter={[44, 24]}>
                        {albumNum.map((item, index) => {
                            return (
                                <Col key={index} span={4} >
                                    <div onClick={()=>{navigate('/album/?id='+(albums !== undefined?(albums[index].id):0))}} >
                                        <CommonCard
                                            imgSrc={(albums?.[index].blurPicUrl !== undefined)?(String(albums[index].blurPicUrl)):''}
                                            title={(albums!==undefined)?(albums[index].name):''}
                                            shape="round"
                                            textPostion="left"
                                            id = {(albums !== undefined?(albums[index].id):0)}
                                        />
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Artist
