import { Grid } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { getSonglists } from 'src/api/songlist';
import { ISonglist } from 'src/api/types/songlist';
import { CommonCard, DynamicTag } from 'src/components';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const Explore = () => {
    const [playList,setPlayList]=useState<ISonglist[]>([]);

    useEffect(()=>{
        getSonglists({}).then(res=>{
            setPlayList(res.playlists)
        })
    },[])
    return (
        <div className="explore">
            <h1>发现</h1>
            <div className="explore-tags">
                <DynamicTag />
            </div>
            <div className="explore-playlist">
                <Row gutter={[44, 24]}>
                    {playList.map((item:ISonglist, index:number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.coverImgUrl}
                                    title={item.name}
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

export default Explore;
