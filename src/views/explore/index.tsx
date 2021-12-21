import { Button, Grid } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IRecommandSonglist, ISonglist } from 'src/api/types/songlist';
import { CommonCard, DynamicTag } from 'src/components';
import { searchTag } from 'src/store/dynamic-tag/reducer';
import { loadMore } from 'src/store/playlist/reducer';
import { ITag } from 'src/types/actions';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const Explore = (props: any) => {
    const [limit,setLimit]=useState(30)
    const tag = props.tag.filter((item: ITag) => item.isCheck)[0].name;
    // 初始化playList
    useEffect(() => {
        props.searchTag({ name: '全部', isCheck: true });
    }, []);

    const handleScroll = (e: any) => {
        console.log(e);
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollTop + clientHeight === scrollHeight) {
            alert('滚动到底部啦');
        }
    };

    useEffect(()=>{
        props.loadMore(tag,limit);
    },[limit])

    return (
        <div className="explore" onScroll={handleScroll}>
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
                                    imgSrc={item.coverImgUrl ? item.coverImgUrl : item.picUrl}
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
                {(tag!=='推荐歌单'&&tag!=='排行榜')?<Button className="load-more-btn" onClick={()=>setLimit(limit+30)}>
                    加载更多
                </Button>:''}
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tag: state.tagReducer,
        playList: state.playListReducer,
    };
};

const mapDispatchToProps = {
    searchTag,
    loadMore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
