import { Button, Tag } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filterPlaylist } from 'src/store/library/reducer';

import './index.less';

const playlistOpt = ['全部歌单', '创建的歌单', '收藏的歌单'];

const SelectTag = (props: any) => {
    const [value, setValue] = useState(playlistOpt[0]);
    const [showOpt, setShowOpt] = useState(false);
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        for (let item of props.tag) {
            if (playlistOpt.includes(item.name) && item.isCheck) {
                setChecked(true)
                return;
            }
        }
        setChecked(false);
    }, [props.tag])
    return (
        <div className="select-tag">
            <Tag checkable className="select" color="gray" checked={checked} onCheck={
                () => {
                    props.filterPlaylist(
                        {
                            name: value,
                            isCheck: !checked
                        }
                    )
                }
            }>
                <span>{value}</span>
                <Button
                    className="drown-btn"
                    icon={<IconDown />}
                    onClick={(event: any) => {
                        setShowOpt(!showOpt);
                        event.stopPropagation();
                    }}
                />
            </Tag>
            <div className={classNames(showOpt ? 'opt-drown' : 'none')}>
                <div className="menu">
                    {playlistOpt.map((item, index) => {
                        return (
                            <div
                                className="item"
                                key={index}
                                onClick={() => {
                                    setValue(item);
                                    if (checked) {
                                        props.filterPlaylist(
                                            {
                                                name: item,
                                                isCheck: true,
                                            }
                                        )
                                    }

                                    setShowOpt(false);
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tag: state.libReducer,
        userInfo: state.userInfoReducer,
    };
};

const mapDispatchToProps = {
    filterPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTag);


