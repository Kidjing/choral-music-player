import { Avatar, Button, Tag, Space, Modal, Input, Checkbox ,Grid} from '@arco-design/web-react';
import { IconClose, IconPlus } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { CommonCard, LikeCard, SelectTag, TrackList } from 'src/components';
import { ICreator } from '../../api/types/user';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;
const data = [1, 1, 1, 1, 1, 1];
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
    }
];

const Library = () => {
    const userInfo: ICreator = {
        userId: 409041521,
        nickname: '嘟噜o匈',
        avatarUrl: 'https://p1.music.126.net/4cA7-y3r_aUqC5k8RUZImQ==/19057835044640063.jpg',
    };
    const playlistOpt = ['全部歌单', '创建的歌单', '收藏的歌单'];
    const tagOpt = ['专辑', '艺人', 'MV', '云盘'];
    const [visible, setVisible] = useState(false);

    
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
                        <SelectTag options={playlistOpt} />
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
                    <Button
                        className="add-btn"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        <IconPlus />
                        新建歌单
                    </Button>
                </div>
                <Row className="cover-row" gutter={[44, 24]}>
                    {data.map((item, index) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc="https://p2.music.126.net/3S-U3XHLH6Z4Vmcijc76Xg==/109951166673278474.jpg?param=512y512"
                                    title="网易云"
                                    shape="round"
                                    textPostion="left"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <Modal
                className="modal"
                title={
                    <div className="modal-header">
                        <div className="modal-header-title">新建歌单</div>
                        <Button
                            className="modal-header-btn"
                            onClick={() => setVisible(false)}
                            icon={<IconClose style={{ margin: 'auto' }} />}
                        />
                    </div>
                }
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={
                    <Button className="modal-footer-btn" type="primary">
                        创建
                    </Button>
                }
                autoFocus={false}
                focusLock={true}
                simple
            >
                <div className="modal-content">
                    <div className="input">
                        <Input placeholder="歌单标题" />
                    </div>
                    <div className="checkbox">
                        <Checkbox>设置为隐私歌单</Checkbox>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Library;
