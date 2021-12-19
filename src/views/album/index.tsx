import { CommonCard, MusicTable } from 'src/components';
import React, { useEffect } from 'react';
import { Button, Space, Grid } from '@arco-design/web-react';
import { IconHeart, IconCaretRight } from '@arco-design/web-react/icon';
import { getAlbum } from 'src/api/album';
import { IGetAlbumResponse } from 'src/api/types/album';
import { IMusic } from 'src/api/types/song';
import { dateTrans } from 'src/utils/timetrans';
import { IArtist } from 'src/api/types/artist';
import { getArtistDetail } from 'src/api/artist';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const More = (props: { artist: number }) => {
    const navigate = useNavigate();
    const id = props.artist;
    const [artist, setArtist] = React.useState<{ artist: IArtist; hotSongs: IMusic[] }>();
    useEffect(() => {
        getArtistDetail(id).then((res) => {
            setArtist(res);
        });
    }, [id]);
    let data = [1, 1, 1, 1, 1, 1];
    return (
        <div className="more">
            <h2>More by {artist?.artist.name}</h2>
            <div className="index-row">
                <Row gutter={[44, 24]}>
                    {data.map((item, index) => {
                        return (
                            <Col
                                onClick={() => {
                                    navigate('/album/?id=' + artist?.hotSongs[index].al.id);
                                }}
                                key={index}
                                span={4}
                            >
                                <CommonCard
                                    imgSrc={
                                        artist?.hotSongs[index].al.picUrl !== undefined
                                            ? artist.hotSongs[index].al.picUrl
                                            : ''
                                    }
                                    title={artist?.hotSongs[index].al.name}
                                    shape="round"
                                    textPostion="left"
                                    type="ablum"
                                    id={artist?.hotSongs[index].al.id}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

const Album = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    let id: number;
    const [album, setAlbum] = React.useState<IGetAlbumResponse>();
    const [heart, setHeart] = React.useState<boolean>(false);
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
    if (album?.album.artist.id !== undefined) {
        artistId = album.album.artist.id;
    }
    return (
        <div className="album">
            <div className="album-msg">
                <div className="album-img">
                    <CommonCard
                        imgSrc={album?.album.blurPicUrl !== undefined ? album.album.blurPicUrl : ''}
                        title=""
                        shape="round"
                        textPostion="left"
                    />
                </div>
                <div className="album-detail">
                    <h1>{album?.album.name}</h1>
                    <p>
                        Singer by{' '}
                        <u
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/artist/?id=' + artistId);
                            }}
                        >
                            {album?.album.artist.name}
                        </u>
                    </p>
                    <p>
                        {date}.{album?.album.size}首歌,{Math.floor(dt / 1000 / 60)}分钟
                    </p>
                    <p style={{ width: 500, height: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {album?.album.description}
                    </p>
                    <Space size="large">
                        <Button type="primary" icon={<IconCaretRight />}>
                            {' '}
                            播放
                        </Button>
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
                                        setHeart(!heart);
                                    }}
                                    style={{ fontSize: 26 }}
                                />
                            )}
                        </Button>
                    </Space>
                </div>

                <div className="table">
                    <MusicTable type="album" data={data} />
                </div>

                {album !== undefined ? <More artist={album.album.artist.id} /> : <div className="more">More by</div>}
            </div>
        </div>
    );
};

export default Album;
