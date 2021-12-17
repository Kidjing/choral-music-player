import { Avatar, Button, Tag, Space } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { LikeCard, SelectTag, TrackList } from 'src/components';
import { ICreator } from '../../api/types/user';

import './index.less';
const playlist = [
    {
        name: 'Ride It',
        id: 1379945341,
        ar: [
            {
                id: 12260125,
                name: 'Regard',
            },
        ],
        al: {
            id: 80594567,
            name: 'Ride It',
            picUrl: 'https://p2.music.126.net/_FEXx8L4oNvuBsiKUdxbQw==/109951165986861088.jpg',
            pic_str: '109951165986861088',
            pic: 109951165986861090,
        },
        dt: 157648,
        publishTime: 1564070400000,
    },
    {
        name: 'Ride It',
        id: 1379945341,
        ar: [
            {
                id: 12260125,
                name: 'Regard',
            },
        ],
        al: {
            id: 80594567,
            name: 'Ride It',
            picUrl: 'https://p2.music.126.net/_FEXx8L4oNvuBsiKUdxbQw==/109951165986861088.jpg',
            pic_str: '109951165986861088',
            pic: 109951165986861090,
        },
        dt: 157648,
        publishTime: 1564070400000,
    },
];

const Library = () => {
    const userInfo: ICreator = {
        userId: 409041521,
        nickname: '嘟噜o匈',
        avatarUrl: 'https://p1.music.126.net/4cA7-y3r_aUqC5k8RUZImQ==/19057835044640063.jpg',
    };
    const playlistOpt = ['全部歌单', '创建的歌单', '收藏的歌单'];
    const tagOpt = ['专辑', '艺人', 'MV', '云盘'];
    return (
        <div className="library">
            <h1>
                <Avatar className="avatar">
                    <img src={userInfo.avatarUrl} />
                </Avatar>
                {userInfo.nickname + '的音乐库'}
            </h1>
            <div className="section-one">
                <LikeCard />
                <TrackList playlist={playlist} />
            </div>
            <div className="section-two">
                <div className="tabs-row">
                    <div className="tabs">
                        <SelectTag options={playlistOpt}/>
                        {tagOpt.map((tag: string, index: number) => {
                            return (
                                <Space key={index} wrap>
                                    <Tag checkable className="tag" color="gray">
                                        {tag}
                                    </Tag>
                                </Space>
                            );
                        })}
                    </div>
                    <Button className="add-btn">
                        <IconPlus />
                        新建歌单
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Library;
