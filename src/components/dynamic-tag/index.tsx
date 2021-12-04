import React, { useState } from 'react';
import { Space, Tag } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';

import './index.less';

const data = [
    {
        category: '语种',
        tags: ['华语', '欧美', '日语', '韩语'],
    },
    {
        category: '风格',
        tags: [
            '流行',
            '摇滚',
            '民谣',
            '电子',
            '流行',
            '摇滚',
            '民谣',
            '电子',
            '流行',
            '摇滚',
            '民谣',
            '电子',
            '流行',
            '摇滚',
            '民谣',
            '电子',
            '流行',
            '摇滚',
            '民谣',
            '电子',
        ],
    },
];

const PanelTag = () => {
    return (
        <div className="dynamic-tag-panel">
            {data.map((item, i) => {
                return (
                    <div key={i} className="dynamic-tag-panel-item">
                        <div className="dynamic-tag-panel-item-category">{item.category}</div>
                        <div className="dynamic-tag-panel-item-tags">
                            {item.tags.map((tag: string, index: number) => {
                                return (
                                    <Space key={index} wrap>
                                        <Tag
                                            style={{ fontSize: 16, marginRight: 24, borderRadius: 10, height: 30 }}
                                            color="arcoblue"
                                            checkable
                                            // checked={false}
                                            // onCheck={(checked) => {
                                            // }}
                                        >
                                            {tag}
                                        </Tag>
                                    </Space>
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
    const [tags, setTags] = useState(['全部', '推荐歌单', '精品推荐', '官方', '排行榜']);
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="dynamic-tag">
            <div className="dynamic-tag-display">
                {tags.map((tag, index) => {
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
