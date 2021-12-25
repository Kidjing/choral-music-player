import { Button, Grid } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IRecommandSonglist, ISonglist } from 'src/api/types/songlist';
import { CommonCard, DynamicTag } from 'src/components';
import { searchTag } from 'src/store/dynamic-tag/reducer';
import { loadMore } from 'src/store/playlist/reducer';
import { ITag } from 'src/store/type';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const Explore = (props: any) => {
    const [searchParams] = useSearchParams();
    const [offset, setOffset] = useState(30);
    const tag = props.tag.filter((item: ITag) => item.isCheck)[0].name;
    const param = searchParams.get('category');
    useEffect(() => {
        props.loadMore(tag, offset, props.before);
    }, [offset]);

    // 首页跳转逻辑
    useEffect(() => {
        if (param) {
            const tag = { name: param, isCheck: true };
            props.searchTag(tag);
        } else {
            props.searchTag({ name: '全部', isCheck: true });
        }
    }, [param]);

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
                                    imgSrc={item.coverImgUrl ? item.coverImgUrl : item.picUrl}
                                    title={item.name}
                                    type="playlist"
                                    id={item.id}
                                    shape="round"
                                    textPostion="left"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="load-more">
                {tag !== '推荐歌单' && tag !== '排行榜' && props.showBtn? (
                    <Button
                        className="load-more-btn"
                        onClick={() => {
                            if (tag === '精品歌单') {
                                props.loadMore(tag, offset, props.before);
                            } else {
                                setOffset(offset + 30);
                            }
                        }}
                    >
                        加载更多
                    </Button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tag: state.tagReducer,
        playList: state.playListReducer,
        before: state.beforeReducer,
        showBtn:state.btnDisplayReducer
    };
};

const mapDispatchToProps = {
    searchTag,
    loadMore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
