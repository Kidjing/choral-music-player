import React, { useState } from 'react';
import { Space, Tag } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import { connect } from 'react-redux';
import PanelTag from './panelTag'

import './index.less';


const DynamicTag = (props:any) => {
    // const store = useStore();
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="dynamic-tag">
            <div className="dynamic-tag-display">
                {props.tags.map((tag: string, index: number) => {
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

const mapStateToProps=(state:any)=>{
    return{
        tags:state.tagReducer
    }
};

export default connect(mapStateToProps)(DynamicTag);