import React, { useState } from 'react';
import { Space, Tag } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import { useDispatch, useStore } from 'react-redux';
import { tagData } from './tagData';

import './index.less';

const PanelTag = () => {
    const store = useStore();
    const dispatch = useDispatch();
    return (
        <div className="dynamic-tag-panel">
            {tagData.map((item, i) => {
                return (
                    <div key={i} className="dynamic-tag-panel-item">
                        <div className="dynamic-tag-panel-item-category">{item.category}</div>
                        <div className="dynamic-tag-panel-item-tags">
                            {item.tags.map((tag: string, index: number) => {
                                return (
                                    <div className="dynamic-tag-panel-item-tag" key={index}>
                                        <Tag
                                            style={{ fontSize: 16, marginRight: 24, borderRadius: 10, height: 30 }}
                                            color="arcoblue"
                                            checkable
                                            checked={store.getState().tagReducer.includes(tag)}
                                            onCheck={() => {
                                                dispatch({
                                                    type: 'CHANGE_TAG',
                                                    payload: tag,
                                                });
                                            }}
                                        >
                                            {tag}
                                        </Tag>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const DynamicTag = () => {
    const store = useStore();
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="dynamic-tag">
            <div className="dynamic-tag-display">
                {store.getState().tagReducer.map((tag: string, index: number) => {
                    return (
                        <Space key={index} wrap>
                            <Tag
                                checkable
                                color="arcoblue"
                                style={{
                                    fontSize: 18,
                                    height: 40,
                                    borderRadius: 10,
                                    marginRight: 16,
                                }}
                            >
                                {tag}
                            </Tag>
                        </Space>
                    );
                })}
                <Tag
                    icon={<IconMore />}
                    color="gray"
                    style={{
                        fontSize: 18,
                        height: 40,
                        borderRadius: 10,
                        marginRight: 16,
                    }}
                    onClick={() => setShowMore(!showMore)}
                />
            </div>
            {showMore ? <PanelTag /> : null}
        </div>
    );
};

export default DynamicTag;
