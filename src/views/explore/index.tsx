import { Button, Grid } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSonglists } from 'src/api/songlist';
import { ISonglist } from 'src/api/types/songlist';
import { CommonCard, DynamicTag } from 'src/components';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const Explore = () => {
    const [playList, setPlayList] = useState<ISonglist[]>([]);
    const [offset,setOffset]=useState<number>(0);
    const limit = 30;
    
    useEffect(() => {
        getSonglists({ limit: limit, offset: offset }).then((res) => {
            setPlayList([...playList,...res.playlists]);
        });
    }, [offset]);

    const loadMore = () => {
        setOffset(offset+limit);
    };
    return (
        <div className="explore">
            <h1>发现</h1>
            <div className="explore-tags">
                <DynamicTag />
            </div>
            <div className="explore-playlist">
                <Row gutter={[44, 24]}>
                    {playList.map((item: ISonglist, index: number) => {
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
            <div className='load-more'>
                <Button className='load-more-btn' onClick={loadMore}>加载更多</Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tags: state.tagReducer,
    };
};

export default connect(mapStateToProps)(Explore);
