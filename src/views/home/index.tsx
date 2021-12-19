import { Grid } from '@arco-design/web-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getNewAlbum } from 'src/api/album';
import { getTopArtist } from 'src/api/artist';
import { IAlbum } from 'src/api/types/album';
import { IArtist } from 'src/api/types/artist';
// import { IMusic } from 'src/api/types/song';
import { CommonCard, DailyCard, FmCard } from 'src/components';
import { recommendPlaylist, topPlaylist } from '../../api/songlist';
import { IRecommandSonglist, ISonglist } from '../../api/types/songlist';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const Home = () => {
    /**
     * TODO: 异步状态优化
     */
    const [personList, setPersonList] = useState<IRecommandSonglist[]>([]);
    const [artistList, setArtistList] = useState<IArtist[]>([]);
    const [albumList, setAlbumList] = useState<IAlbum[]>([]);
    const [rankList, setRankList] = useState<ISonglist[]>([]);
    // const [dailyList,setDailyList]=useState<IMusic[]>([]);

    useEffect(() => {
        recommendPlaylist(12).then((res) => {
            setPersonList(res);
        });
        getTopArtist(1).then((res) => {
            setArtistList(res.slice(0, 6));
        });
        topPlaylist().then((res) => {
            setRankList(res.slice(0, 6));
        });
        getNewAlbum(12, 0).then((res) => {
            setAlbumList(res);
        });
        // getDailyPlaylist().then(res=>{
        //     setDailyList(res)
        // }).catch(
        //     res=>console.log(res)
        // )
    }, []);
    return (
        <div className="home">
            <div className={classNames('index-row', 'first-row')}>
                <div className="title">推荐歌单</div>
                <Row className="cover-row" gutter={[44, 24]}>
                    {personList.map((item: IRecommandSonglist, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.picUrl}
                                    title={item.name}
                                    desc={item.copywriter}
                                    type='playlist'
                                    id={item.id}
                                    shape="round"
                                    textPostion="left"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="index-row">
                <div className="title">For You</div>
                <Row gutter={[44, 24]}>
                    <Col span={12}>
                        <DailyCard imgSrc="https://p4.music.126.net/VuJFMbXzpAProbJPoXLv7g==/7721870161993398.jpg?param=1024y1024" />
                    </Col>
                    <Col span={12}>
                        <FmCard
                            imgSrc="https://p4.music.126.net/VuJFMbXzpAProbJPoXLv7g==/7721870161993398.jpg?param=1024y1024"
                            title="MOM"
                            artists={[
                                {
                                    id: 12260125,
                                    name: 'Regard',
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </div>
            <div className="index-row">
                <div className="title">推荐艺人</div>
                <Row gutter={[44, 24]}>
                    {artistList.map((item: IArtist, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.picUrl}
                                    title={item.name}
                                    type='artist'
                                    id={item.id}
                                    shape="circle"
                                    textPostion="center"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="index-row">
                <div className="title">新专速递</div>
                <Row gutter={[44, 24]}>
                    {albumList.map((album: IAlbum, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={album.picUrl}
                                    title={album.name}
                                    desc={<a href={'artist/'+album.id}>{album.artist.name} </a>}
                                    type='album'
                                    id={album.id}
                                    shape="round"
                                    textPostion="left"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="index-row">
                <div className="title">排行榜</div>
                <Row gutter={[44, 24]}>
                    {rankList.map((item: ISonglist, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.coverImgUrl}
                                    title={item.name}
                                    desc={item.updateFrequency}
                                    type='playlist'
                                    id={item.id}
                                    shape="round"
                                    textPostion="left"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default Home;
