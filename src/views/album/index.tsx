import { CommonCard, MusicTable, TextModal } from 'src/components';
import React, { useEffect } from 'react';
import { Button, Space, Grid, Alert } from '@arco-design/web-react';
import { IconHeart, IconCaretRight, IconPause } from '@arco-design/web-react/icon';
import { getAlbum, getArtistAlbum } from 'src/api/album';
import { IGetAlbumResponse, IAlbum } from 'src/api/types/album'
import { IMusic } from 'src/api/types/song';
import { dateTrans } from 'src/utils/timetrans';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const More = (props:{ artist:number,name:string }) => {
    const navigate = useNavigate();
    const id = props.artist;
    const [album, setAlbum] = React.useState<IAlbum[]>()
    useEffect(()=>{
        getArtistAlbum(id).then(res =>{
            setAlbum(res);
        })
    },[id])
    let data = [1]
    if(album !== undefined){
        const n = album?.length>=6? 6 : album?.length
        for(let i=0;i<n;i++){
            data[i] = 1
        }
    }
    return (
        <div className="more">
            {album!==undefined?(
                <div>
                    <h2>More by {props.name}</h2>
                    <div className="index-row">
                        <Row gutter={[44, 24]}>
                            {data.map((item, index) => {
                                return (
                                    <Col
                                        onClick={() => {
                                            navigate('/album?id='+(album !== undefined?(album[index].id):0));
                                        }}
                                        key={index}
                                        span={4}
                                    >
                                        <CommonCard
                                            imgSrc={
                                                ((album !== undefined?
                                                    (album[index].picUrl)
                                                    :''))
                                            }
                                            title={String((album !== undefined?
                                                (album[index].name):''))
                                            }
                                            shape="round"
                                            textPosition="left"
                                            type="album"
                                            id={album !== undefined?(album[index].id):0}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            ):(
                null
            )}
        </div>
    );
};

const Album = (props:any) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    let id: number;
    const [album, setAlbum] = React.useState<IGetAlbumResponse>();
    const [heart, setHeart] = React.useState<boolean>(false);
    const [play, setPlay] = React.useState<boolean>(false);
    const [alert, setAlert] = React.useState<boolean>(false);
    useEffect(() => {
        id = Number(searchParams.get('id'));
        getAlbum(Number(id)).then((res) => {
            setAlbum(res);
        });
    }, [searchParams]);
    let dt = 0;
    let d: IMusic;
    const data = album?.songs;
    if (data !== undefined) {
        for (d of data) {
            dt += d.dt;
        }
    }
    let date = '';
    if (album?.album.publishTime !== undefined) {
        date = dateTrans(album.album.publishTime);
    }
    let artistId: number;
    let albumId:number;
    if (album?.album !== undefined) {
        artistId = album.album.artist.id;
        albumId = album.album.id;
    }
    return (
        <div className="album">
            {alert?(
                <Alert className='alert' closable type='info' title='请先登录' content='需要登录才能使用该功能' onClose={()=>{setAlert(false)}} />
            ):(
                null
            )}
            {album!==undefined?(
                <div>
                    <div className="album-msg">
                        <div className="album-img"
                            onClick={()=>{navigate('/album?id=' + albumId);}}
                        >
                            <CommonCard
                                imgSrc={album?.album.picUrl !== undefined ? album.album.picUrl : ''}
                                title=""
                                shape="round"
                                textPosition="left"
                            />
                        </div>
                        <div className="album-detail">
                            <h1>{album?.album.name}</h1>
                            <p>
                                Singer by{' '}
                                <u
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        navigate('/artist?id=' + artistId);
                                    }}
                                >
                                    {album?.album.artist.name}
                                </u>
                            </p>
                            <p>
                                {date}.{album?.album.size}首歌,{Math.floor(dt / 1000 / 60)}分钟
                            </p>
                            <p>
                                {album.album.description!==null?(
                                    <TextModal 
                                        desc={String(album?album.album.description:'')} 
                                        title='专辑介绍'
                                    />
                                ):' '}
                            </p>
                            <br/>
                            <Space size="large">
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
                            <Space size="large">
                                <Button style={{ marginLeft: 20, backgroundColor: 'transparent' }} title="收藏">
                                    {heart ? (
                                        <IconHeart
                                            onClick={() => {
                                                setHeart(!heart);
                                            }}
                                            style={{ fontSize: 26, color: 'red' }}
                                        />
                                    ) : (
                                        <IconHeart
                                            onClick={() => {
                                                if(props.userInfo.status){
                                                    setHeart(!heart);
                                                }else{
                                                    setAlert(true);
                                                }
                                            }}
                                            style={{ fontSize: 26 }}
                                        />
                                    )}
                                </Button>
                            </Space>
                        </div>
                    </div>

                    <div className="table">
                        <MusicTable type="album" data={data} status={props.userInfo.status} />
                    </div>

                    {album !== undefined ? <More artist={album.album.artist.id} name={album.album.artist.name} /> : <div className="more">More by</div>}
                </div>
            ):null}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(Album);
