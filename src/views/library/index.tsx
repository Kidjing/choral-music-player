import { Avatar, Button, Tag, Space, Modal, Input, Checkbox ,Grid} from '@arco-design/web-react';
import { IconClose, IconPlus } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { IMusic } from 'src/api/types/song';
import { UserPlaylist } from 'src/api/types/user';
import { getUserSonglistByID } from 'src/api/user';
import { CommonCard, LikeCard, SelectTag, TrackList } from 'src/components';
import { filterPlaylist } from 'src/store/library/reducer';
import { ITag } from 'src/types/actions';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;
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

const Library = (props:any) => {
    const playlistOpt = ['全部歌单', '创建的歌单', '收藏的歌单'];
    const [playList,setPlayList]=useState<UserPlaylist[]>([])
    // const [cloud,setCloud]=useState<IMusic[]>([])
    const [visible, setVisible] = useState(false);
    useEffect(()=>{
        getUserSonglistByID(props.userInfo.userId).then(res=>{
            setPlayList(res)
        });

    },[])

    console.log("playList",playList)
    return (
        <div className="library">
            <h1>
                <Avatar className="avatar">
                    <img src={props.userInfo.avatarUrl} />
                </Avatar>
                {props.userInfo.nickname + '的音乐库'}
            </h1>
            <div className="section-one">
                <LikeCard />
                <TrackList playlist={playlist} />
            </div>
            <div className="section-two">
                <div className="tabs-row">
                    <div className="tabs">
                        <SelectTag options={playlistOpt} />
                        {props.tag.map((tag: ITag, index: number) => {
                            return (
                                <Space key={index} wrap>
                                    <Tag checkable className="tag" checked={tag.isCheck} onCheck={()=>{
                                        props.filterPlaylist(tag)
                                    }} color="gray">
                                        {tag.name}
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
                    {playList.map((item:UserPlaylist, index:number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.coverImgUrl}
                                    title={item.name}
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


const mapStateToProps = (state: any) => {
    return {
        tag: state.libReducer,
        userInfo:state.userInfoReducer
    };
};

const mapDispatchToProps = {
    filterPlaylist,
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Library);
