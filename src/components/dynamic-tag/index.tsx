import React, { useState } from 'react';
import { Space, Tag } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import { connect } from 'react-redux';
import PanelTag from './panelTag';
import { searchTag } from 'src/store/dynamic-tag/reducer';
import { useNavigate } from 'react-router-dom';
import { ITag } from 'src/store/type';

import './index.less';

const DynamicTag = (props: any) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="dynamic-tag">
            <div className="dynamic-tag-display">
                {props.tags.map((tag: ITag, index: number) => {
                    return (
                        <Space key={index} wrap>
                            <Tag
                                checkable
                                checked={tag.isCheck}
                                onCheck={() => {
                                    navigate('?category=' + tag.name);
                                    props.searchTag(tag);
                                }}
                                className="tag"
                                color="arcoblue"
                            >
                                {tag.name}
                            </Tag>
                        </Space>
                    );
                })}
                <Tag icon={<IconMore />} className="tag" color="gray" onClick={() => setShowMore(!showMore)} />
            </div>
            {showMore ? <PanelTag /> : null}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tags: state.tagReducer,
    };
};

const mapDispatchToProps = { searchTag };

export default connect(mapStateToProps, mapDispatchToProps)(DynamicTag);
