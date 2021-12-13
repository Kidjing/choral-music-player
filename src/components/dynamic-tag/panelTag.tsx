import React from 'react';
import { Tag } from '@arco-design/web-react';
import { connect } from 'react-redux';
import { tagData } from './tagData';
import { changeTag } from 'src/store/dynamic-tag/reducer';

import './index.less';


const PanelTag = (props:any) => {
    // const store = useStore();
    // const dispatch = useDispatch();
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
                                            checked={props.tags.includes(tag)}
                                            onCheck={()=>{props.changeTag(tag)}}
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

const mapStateToProps=(state:any)=>{
    return{
        tags:state.tagReducer
    }
};

const mapDispatchToProps={changeTag};

export default connect(mapStateToProps,mapDispatchToProps)(PanelTag);