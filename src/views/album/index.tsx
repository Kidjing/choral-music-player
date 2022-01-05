import { CommonCard, MusicTable, TextModal, PlayButton } from 'src/components';
import React, { useEffect } from 'react';
import { Button, Space, Grid, Message } from '@arco-design/web-react';
import { IconHeart, IconHeartFill } from '@arco-design/web-react/icon';
import { getAlbum, getArtistAlbum } from 'src/api/album';
import { IGetAlbumResponse, IAlbum } from 'src/api/types/album'
import { IMusic } from 'src/api/types/song';
import { dateTrans } from 'src/utils/timetrans';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const More = (props: { artist: number, name: string }) => {
    const id = props.artist;
    const [album, setAlbum] = React.useState<IAlbum[]>()
    useEffect(() => {
        getArtistAlbum(id).then(res => {
            setAlbum(res);
        })
    }, [id])
    let data = [1]
    if (album !== undefined) {
        const n = album?.length >= 6 ? 6 : album?.length
        for (let i = 0; i < n; i++) {
            data[i] = 1
        }
    }
    return (
        <div className="more">
            {album !== undefined ? (
                <div>
                    <h2>More by {props.name}</h2>
                    <div className="index-row">
                        <Row gutter={[44, 24]}>
                            {data.map((item, index) => {
                                return (
                                    <Col
                                        key={index}
                                        span={4}
                                    >
                                        <CommonCard
                                            imgSrc={album[index].picUrl}
                                            title={String((album[index].name))}
                                            shape="round"
                                            textPosition="left"
                                            type="album"
                                            id={(album[index].id)}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            ) : (
                null
            )}
        </div>
    );
};

const Album = (props: any) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [album, setAlbum] = React.useState<IGetAlbumResponse>();
    const [heart, setHeart] = React.useState<boolean>(false);
    let id = Number(searchParams.get('id'));

    useEffect(() => {
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
    let albumId: number;
    if (album?.album !== undefined) {
        artistId = album.album.artist.id;
        albumId = album.album.id;
    }
    return (
        <div className="album">
            {album !== undefined ? (
                <div>
                    <div className="album-msg">
                        <div className="album-img"
                            onClick={() => { navigate('/album?id=' + albumId); }}
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
                                {album.album.description !== null ? (
                                    <TextModal
                                        desc={String(album ? album.album.description : '')}
                                        title='专辑介绍'
                                    />
                                ) : ' '}
                            </p>
                            <br />
                            <Space size="large">
                                <PlayButton id={id} type='album'/>
                                <Button className='btn' title="收藏">
                                    {heart ? (
                                        <IconHeartFill
                                            onClick={() => {
                                                setHeart(!heart);
                                            }}
                                            style={{ fontSize: 26, color: 'red' }}
                                        />
                                    ) : (
                                        <IconHeart
                                            onClick={() => {
                                                if (props.userInfo.status) {
                                                    setHeart(!heart);
                                                } else {
                                                    Message.info({ content: '收藏需要先登录哦!', showIcon: true, position: 'top' })
                                                }
                                            }}
                                            style={{ fontSize: 26, color: 'red' }}
                                        />
                                    )}
                                </Button>
                            </Space>
                        </div>
                    </div>

                    <div className="table">
                        <MusicTable type="album" data={data} status={props.userInfo.status} />
                    </div>

                    <More artist={album.album.artist.id} name={album.album.artist.name} />
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(Album);
