import { Grid } from '@arco-design/web-react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRecommandSonglist, ISonglist } from 'src/api/types/songlist';
import { CommonCard, DynamicTag } from 'src/components';
import { searchTag } from 'src/store/dynamic-tag/reducer';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const Explore = (props: any) => {
    // 初始化playList
    useEffect(()=>{
        props.searchTag({name:'全部',isCheck:true})
    },[])

    return (
        <div className="explore">
            <h1>发现</h1>
            <div className="explore-tags">
                <DynamicTag />
            </div>
            <div className="explore-playlist">
                <Row gutter={[44, 24]}>
                    {props.playList.map((item: ISonglist & IRecommandSonglist, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.coverImgUrl?item.coverImgUrl:item.picUrl}
                                    title={item.name}
                                    shape="round"
                                    textPostion="left"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="load-more">
                {/* <Button className="load-more-btn" onClick={loadMore}>
                    加载更多
                </Button> */}
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        playList: state.playListReducer,
    };
};

const mapDispatchToProps={
    searchTag
}

export default connect(mapStateToProps,mapDispatchToProps)(Explore);
