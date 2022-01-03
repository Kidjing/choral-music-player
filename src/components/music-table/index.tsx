import React, { useState } from 'react';
import { Table, Button, Message } from '@arco-design/web-react';
import { IconCaretRight, IconHeart, IconHeartFill, IconSound } from '@arco-design/web-react/icon';
import { IMusic, IArtistItem } from '../../api/types/song';
import { timeToMinute } from 'src/utils/timetrans';
import { useNavigate } from 'react-router-dom';
import { store } from 'src/store/index'

import './index.less';
import classNames from 'classnames';

interface MusicTableProps<T> {
    style?: React.CSSProperties;
    className?: string;
    type: 'playlist' | 'album';
    data?: T[];
    status?: boolean;
}

interface ShowState {
    musicId: number;
    show?: boolean;
}

interface LikeState {
    musicId: number;
    like?: boolean;
}
const MusicTable = (props: MusicTableProps<IMusic>) => {
    const { data, type } = props;
    const status = store.getState().userInfoReducer.status
    const navigate = useNavigate()
    const [play, setPlay] = useState<boolean[]>(new Array(data !== undefined ? data.length : 0).fill(false));
    const [checkId, setCheckId] = useState(0);
    const [showPlay, setShowPlay] = useState({ num: 1, show: false });
    const [showAction, setShowAction] = useState<ShowState>({ musicId: 1, show: false });
    const [LikeAction, setLikeAction] = useState<LikeState>({ musicId: 1, like: false });

    const columns = [
        {
            title: '',
            width: '20px',
            headerCellStyle: {
                borderBottom: 0,
                borderRadius: 12,
            },
            render: (col: string, record: IMusic, item: number) => {
                if (type === 'playlist') {
                    return <img  className="playlist-img" src={record.al.picUrl + '?param=100y100'} onClick={() => { navigate('/album?id=' + record.al.id) }} />;
                } else {
                    return (
                        <div className="album-prefix">
                            {item === showPlay.num && showPlay.show ? (
                                <Button
                                    onClick={() => {
                                        let newplays = new Array(data !== undefined ? data.length : 0).fill(false)
                                        newplays[item] = true
                                        setPlay(newplays)
                                    }}
                                    className="album-prefix-btn"
                                    icon={
                                        play[item] ? (
                                            <IconSound style={{ fontSize: 16, color: 'blue' }} />
                                        ) : (
                                            <IconCaretRight style={{ fontSize: 16, color: 'blue' }} />
                                        )
                                    }
                                />
                            ) : (
                                <div className="album-prefix-num">{item + 1}</div>
                            )}
                        </div>
                    );
                }
            },
        },
        {
            title: 'Song',
            render: (col: string, record: IMusic) => (
                <div className="music-table-song">
                    <div className="name">
                        <span onClick={() => { navigate('/song?id=' + record.id) }}>{record.name}</span>
                    </div>
                    {type === 'playlist' ? (
                        <div className="artist">
                            {record.ar.map((item: IArtistItem, index: number) => {
                                if (index === record.ar.length - 1) {
                                    return <a onClick={() => { navigate('/artist?id=' + record.ar[index].id) }}>{item.name} </a>;
                                } else {
                                    return <a onClick={() => { navigate('/artist?id=' + record.ar[index].id) }}>{item.name},</a>;
                                }
                            })}
                        </div>
                    ) : null}
                </div>
            ),
        },
        {
            title: 'Album',
            render: (col: string, record: IMusic) =>
                type === 'playlist' ? (
                    <div className="playlist-album">
                        <a onClick={() => { navigate('/album?id=' + record.al.id) }}>{record.al.name}</a>
                    </div>
                ) : null,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '20%',
            render: (col: string, record: IMusic) => (
                <div className="music-table-action">
                    <Button
                        className={classNames(record.id === showAction.musicId && showAction.show ? '' : 'hidden')}
                        onClick={() => {
                            if (status) {
                                setLikeAction({ musicId: record.id, like: !LikeAction.like });
                            } else {
                                Message.info({ content: '收藏请先登录哦!', showIcon: true, position: 'top' })
                            }
                        }}
                        style={{ background: 'transparent' }}
                        icon={
                            record.id === LikeAction.musicId && LikeAction.like ? (
                                <IconHeartFill style={{ fontSize: 20, color: 'red' }} />
                            ) : (
                                <IconHeart style={{ fontSize: 20, color: 'red' }} />
                            )
                        }
                    />
                </div>
            ),
        },
        {
            headerCellStyle: {
                borderBottom: "0px",
                borderRadius: "12px",
            },
            title: 'Time',
            width: '8%',
            render: (col: string, record: IMusic) => <div className="music-table-time">{timeToMinute(record.dt!)}</div>,
        },
    ];
    return (
        <div>
            <Table
                className="music-table"
                showHeader={false}
                border={{ cell: false }}
                loading={data !== undefined ? false : true}
                noDataElement={<div> </div>}
                rowClassName={(record) => {
                    return record.id === checkId ? 'clickrow' : 'clickrow';
                }}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            setCheckId(record.id);
                        },
                        onDoubleClick: () => {
                            console.log(record.name);
                        },
                        onMouseEnter: () => {
                            setShowPlay({ num: index, show: true });
                            setShowAction({ musicId: record.id, show: true });
                        },
                        onMouseLeave: () => {
                            setShowPlay({ num: index, show: false });
                            setShowAction({ musicId: record.id, show: false });
                        },
                    };
                }}
                columns={columns}
                data={data}
                pagination={false}
            />
        </div>
    );
};

export default MusicTable;
