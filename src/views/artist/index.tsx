import { CommonCard, TextModal } from 'src/components';
import React, { useEffect } from 'react';
import { Button, Space, Grid, Message } from '@arco-design/web-react';
import { IconCaretRight, IconPause } from '@arco-design/web-react/icon';
import { getArtistDetail } from 'src/api/artist';
import { IArtist } from 'src/api/types/artist';
import { IMusic } from 'src/api/types/song';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getArtistAlbum } from 'src/api/album';
import { IAlbum } from 'src/api/types/album';
import { dateTrans } from 'src/utils/timetrans';
import { connect } from 'react-redux';
import { Track } from 'src/components/track-list';
import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const Artist = (props: any) => {
    const status = props.userInfo.status
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [artist, setArtist] = React.useState<{ artist: IArtist; hotSongs: IMusic[] }>();
    const [albums, setAlbums] = React.useState<IAlbum[]>();
    const [play, setPlay] = React.useState<boolean>(false);
    const [follow, setFollow] = React.useState<boolean>(false);
    const [all, setAll] = React.useState<boolean>(false);
    let id: number;
    useEffect(() => {
        id = Number(searchParams.get('id'));
        getArtistDetail(id).then((res) => {
            setArtist(res);
        });
        getArtistAlbum(id).then((res) => {
            setAlbums(res);
        });
    }, [searchParams]);
    let i: number;
    let albumNum = [];
    if (albums !== undefined) {
        for (i = 0; i < albums?.length; i++) {
            albumNum[i] = 1;
        }
    }
    return (
        <div className="artist">
            {(artist !== undefined && albums !== undefined) ? (
                <div>
                    <div className="artist-msg">
                        <div
                            className="artist-img"
                            onClick={() => {
                                navigate('/artist?id=' + artist?.artist.id);
                            }}
                        >
                            <CommonCard
                                imgSrc={artist.artist.picUrl}
                                title=""
                                shape="circle"
                                textPosition="left"
                            />
                        </div>
                        <div className="artist-detail">
                            <h1>{artist?.artist.name}</h1>
                            <p>艺人</p>
                            <p>
                                <a href="#hotSongs" className="a">
                                    {artist?.artist.musicSize}首歌
                                </a>
                                {'  .  '}
                                <a href="#album" className="a">
                                    {artist?.artist.albumSize}专辑
                                </a>
                                . {artist?.artist.mvSize}个MV
                            </p>
                            <p>
                                {artist.artist.briefDesc !== null ? (
                                    <TextModal desc={String(artist?.artist.briefDesc)} title="艺术家介绍" />
                                ) : (
                                    null
                                )}
                            </p>
                            <br />
                            <Space size='large'>
                                {play ? (
                                    <Button
                                        onClick={() => {
                                            setPlay(!play);
                                        }}
                                        className='btn'
                                        icon={<IconPause />}
                                    >
                                        暂停
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            setPlay(!play);
                                        }}
                                        className='btn'
                                        icon={<IconCaretRight />}
                                    >
                                        播放
                                    </Button>
                                )}
                                {follow ? (
                                    <Button
                                        onClick={() => {
                                            setFollow(!follow);
                                        }}
                                        className='btn'
                                    >
                                        已关注
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            if (status) {
                                                setFollow(!follow);
                                            } else {
                                                Message.info({ content: '关注需要先登录哦!', showIcon: true, position: 'top' })
                                            }
                                        }}
                                        className='btn'
                                    >
                                        关注
                                    </Button>
                                )}
                            </Space>
                        </div>
                    </div>

                    <div className="new">
                        <h2>最新发布</h2>
                        <div className="new-album">
                            <div
                                className="new-album-img"
                                onClick={() => {
                                    navigate('/album?id=' + (albums !== undefined ? albums[0].id : 0));
                                }}
                            >
                                <CommonCard
                                    imgSrc={String(albums[0].picUrl)}
                                    title=""
                                    shape="round"
                                    textPosition="left"
                                />
                            </div>
                            <div className="new-album-msg">
                                <h3
                                    className="h3"
                                    onClick={() => {
                                        navigate('/album?id=' + albums[0].id);
                                    }}
                                >
                                    {albums[0].name}
                                </h3>
                                <p>{dateTrans(Number(albums[0].publishTime))}</p>
                                <p>{albums[0].size}首歌</p>
                            </div>
                        </div>
                        {albums !== undefined && albums.length >= 2 ? (
                            <div className="new-album">
                                <div
                                    onClick={() => {
                                        navigate('/album?id=' + (albums[1].id));
                                    }}
                                    className="new-album-img"
                                >
                                    <CommonCard
                                        imgSrc={String(albums[1].picUrl)}
                                        title=""
                                        shape="round"
                                        textPosition="left"
                                    />
                                </div>
                                <div className="new-album-msg">
                                    <h3
                                        className="h3"
                                        onClick={() => {
                                            navigate('/album?id=' + albums[1].id);
                                        }}
                                    >
                                        {albums[1].name}
                                    </h3>
                                    <p>{dateTrans(Number(albums[1].publishTime))}</p>
                                    <p>{albums[1].size}首歌</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {' '}
                            </div>
                        )}
                    </div>

                    <div id="hotSongs">
                        <h2>热门歌曲</h2>
                        {all ? (
                            <div>
                                <Row gutter={[4, 4]}>
                                    {artist?.hotSongs.slice(0, 24).map((item, index) => {
                                        return (
                                            <Col key={index} span={6}>
                                                <Track album={item} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                                <div className='get-all' onClick={() => setAll(false)}>收回</div>
                            </div>
                        ) : (
                            <div>

                                <Row gutter={[4, 4]}>
                                    {artist?.hotSongs.slice(0, 12).map((item, index) => {
                                        return (
                                            <Col key={index} span={6}>
                                                <Track album={item} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                                {artist?.hotSongs.length > 12 ?
                                    <div className='get-all' onClick={() => setAll(true)}>显示全部</div>
                                    : null}
                            </div>
                        )}
                    </div>

                    <div id="album">
                        <h2>专 辑</h2>
                        <div className="index-row">
                            <Row gutter={[44, 24]}>
                                {albumNum.map((item, index) => {
                                    return (
                                        <Col key={index} span={4}>
                                            <div
                                                onClick={() => {
                                                    navigate('/album?id=' + albums[index].id);
                                                }}
                                            >
                                                <CommonCard
                                                    imgSrc={String(albums[index].picUrl)}
                                                    title={albums[index].name}
                                                    shape="round"
                                                    textPosition="left"
                                                    type="album"
                                                    id={albums[index].id}
                                                />
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
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

export default connect(mapStateToProps)(Artist);
