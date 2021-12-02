import React, { useState } from 'react';
import { Table, Button } from '@arco-design/web-react';
import { IconHeart, IconHeartFill } from '@arco-design/web-react/icon';
import { IMusic, IArtist } from '../../api/types/playlist';

import './index.less';
import classNames from 'classnames';

interface PlaylistProps<T> {
    style?: React.CSSProperties;
    className?: string;
    data?: T[];
}

interface ShowState {
    musicId: number;
    show?: boolean;
}

interface LikeState {
    musicId: number;
    like?: boolean;
}
const PlayList = (props: PlaylistProps<IMusic>) => {
    const { data } = props;
    const [showAction, setShowAction] = useState<ShowState>({ musicId: 1, show: false });
    const [LikeAction, setLikeAction] = useState<LikeState>({ musicId: 1, like: false });

    const columns = [
        {
            title: 'Cover',
            width: 20,
            render: (col: string, record: IMusic) => <img className="playlist-img" src={record.album.picUrl} />,
        },
        {
            title: 'Song',
            render: (col: string, record: IMusic) => (
                <div className="playlist-song">
                    <div className="playlist-song-name">{record.name}</div>
                    <div className="playlist-song-artist">
                        {record.artists.map((item: IArtist, index: number) => {
                            if (index === record.artists.length - 1) {
                                return <a href={item.img1v1Url}>{item.name} </a>;
                            } else {
                                return <a href={item.img1v1Url}>{item.name},</a>;
                            }
                        })}
                    </div>
                </div>
            ),
        },
        {
            title: 'Album',
            render: (col: string, record: IMusic) => <div>{record.album.name}</div>,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '20%',
            render: (col: string, record: IMusic) => (
                <div className="playlist-action">
                    <Button
                        className={classNames(record.id === showAction.musicId && showAction.show ? '' : 'hidden')}
                        onClick={() => {
                            setLikeAction({ musicId: record.id, like: !LikeAction.like });
                        }}
                        style={{ background: 'transparent' }}
                        icon={
                            record.id === LikeAction.musicId && LikeAction.like ? (
                                <IconHeartFill style={{ fontSize: 20 }} />
                            ) : (
                                <IconHeart style={{ fontSize: 20 }} />
                            )
                        }
                    />
                </div>
            ),
        },
        {
            title: 'Time',
            width: '8%',
            render: (col: string, record: IMusic) => <div className="playlist-time">{record.duration}</div>,
        },
    ];
    return (
        <Table
            className="playlist"
            showHeader={false}
            border={{ cell: false }}
            size="middle"
            onRow={(record) => {
                return {
                    onDoubleClick: () => {
                        console.log(record.name);
                    },
                    onMouseEnter: () => {
                        setShowAction({ musicId: record.id, show: true });
                    },
                    onMouseLeave: () => {
                        setShowAction({ musicId: record.id, show: false });
                    },
                };
            }}
            columns={columns}
            data={data}
        />
    );
};

export default PlayList;
