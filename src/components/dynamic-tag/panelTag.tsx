import React from 'react';
import { Tag } from '@arco-design/web-react';
import { connect } from 'react-redux';
import { tagData } from './tagData';
import { changeTag } from 'src/store/dynamic-tag/reducer';
import { ITag } from 'src/types/actions';

import './index.less';

const PanelTag = (props: any) => {

    return (
        <div className="dynamic-tag-panel">
            {tagData.map((item, i) => {
                return (
                    <div key={i} className="dynamic-tag-panel-item">
                        <div className="dynamic-tag-panel-item-category">{item.category}</div>
                        <div className="dynamic-tag-panel-item-tags">
                            {item.tags.map((name: string, index: number) => {
                                const tag = { name: name, isCheck: false };
                                const tags=props.tags.map((item:ITag)=>{
                                    return item.name;
                                })
                                return (
                                    <div className="dynamic-tag-panel-item-tag" key={index}>
                                        <Tag
                                            className="tag"
                                            key={index}
                                            color="arcoblue"
                                            checkable
                                            checked={tags.includes(name)}
                                            onCheck={() => {
                                                props.changeTag(tag);
                                            }}
                                        >
                                            {name}
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

const mapStateToProps = (state: any) => {
    return {
        tags: state.tagReducer,
    };
};

const mapDispatchToProps = { changeTag };

export default connect(mapStateToProps, mapDispatchToProps)(PanelTag);
