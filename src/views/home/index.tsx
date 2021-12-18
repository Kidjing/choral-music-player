import { Grid } from '@arco-design/web-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CommonCard, DailyCard, FmCard } from 'src/components';
import { recommendPlaylist } from '../../api/songlist';
import { ISonglist } from '../../api/types/songlist';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;
const data = [1, 1, 1, 1, 1, 1];

const Home = () => {
    const [personList, setPersonList] = useState<ISonglist[]>([]);
    
    useEffect(()=>{
        recommendPlaylist(12).then((res) => {
            setPersonList(res);
        });
    },[])
    return (
        <div className="home">
            <div className={classNames('index-row', 'first-row')}>
                <div className="title">推荐歌单</div>
                <Row className="cover-row" gutter={[44, 24]}>
                    {personList.map((item:ISonglist, index:number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.picUrl}
                                    title={item.name}
                                    desc={item.copywriter}
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
                    {data.map((item, index) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc="https://p1.music.126.net/11NBW2T83KnHLZ89eXLXbw==/109951165663271282.jpg?param=512y512"
                                    title="网易云"
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
                    {data.map((item, index) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc="https://p1.music.126.net/ushHeJuVgLag0oUONbUJxg==/109951166709761190.jpg?param=512y512"
                                    title="网易云"
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
                    {data.map((item, index) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc="https://p1.music.126.net/ushHeJuVgLag0oUONbUJxg==/109951166709761190.jpg?param=512y512"
                                    title="网易云"
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
