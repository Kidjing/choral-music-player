import { Avatar, Button, Tag, Space, Modal, Input, Checkbox, Grid } from '@arco-design/web-react';
import { IconClose, IconPlus } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IMusic } from 'src/api/types/song';
import { UserPlaylist } from 'src/api/types/user';
import { getUserSonglistByID, getUserLikelistByID, getUserAlbumlist, getUserArtistlist } from 'src/api/user';
import { CommonCard, LikeCard, SelectTag, TrackList } from 'src/components';
import { filterPlaylist } from 'src/store/library/reducer';
import { ITag } from 'src/store/type';
import { getSongDetail } from 'src/api/song'
import { getHotComment } from 'src/api/comment'
import { IAlbum } from 'src/api/types/album';

import './index.less';
import { IArtist } from 'src/api/types/artist';

const Row = Grid.Row;
const Col = Grid.Col;

interface IData {
    playList: UserPlaylist[],
    userAlbum: IAlbum[],
    userArtist: IArtist[],
    tag: any,
}

const UserLibrary = (data: IData) => {

    for (let item of data.tag) {
        if (item.name === '创建的歌单' && item.isCheck) {
            data.playList = data.playList.filter((item) => {
                return !item.subscribed
            })
            break;
        }
        if (item.name === '收藏的歌单' && item.isCheck) {
            data.playList = data.playList.filter((item) => {
                return item.subscribed
            })
            break;
        }
        if (item.name === '专辑' && item.isCheck) {
            return (
                <Row className="cover-row" gutter={[44, 24]}>
                    {data.userAlbum.map((item: IAlbum, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.picUrl}
                                    title={item.name}
                                    shape="round"
                                    textPostion="left"
                                    type='album'
                                    id={item.id}
                                    desc={item.artists![0].name}
                                />
                            </Col>
                        );
                    })}
                </Row>
            )

        }
        if (item.name === '艺人' && item.isCheck) {
            return (
                <Row className="cover-row" gutter={[44, 24]}>
                    {data.userArtist.map((item: IArtist, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.picUrl}
                                    title={item.name}
                                    shape="circle"
                                    textPostion="center"
                                    type='artist'
                                    id={item.id}

                                />
                            </Col>
                        );
                    })}
                </Row>
            )
        }
    }
    return (
        <Row className="cover-row" gutter={[44, 24]}>
            {data.playList.map((item: UserPlaylist, index: number) => {
                return (
                    <Col key={index} span={4}>
                        <CommonCard
                            imgSrc={item.coverImgUrl}
                            title={item.name}
                            desc={'by ' + item.creator.nickname}
                            shape="round"
                            id={item.id}
                            type="playlist"
                            textPostion="left"
                        />
                    </Col>
                );
            })}
        </Row>
    );
}

const Library = (props: any) => {
    const playlistOpt = ['全部歌单', '创建的歌单', '收藏的歌单'];
    const [playList, setPlayList] = useState<UserPlaylist[]>([])
    const [likedList, setLikedList] = useState<IMusic[]>([])
    const [likedNumber, setLikedNumber] = useState<number>(0)
    const [userAlbum, setUserAlbum] = useState<IAlbum[]>([])
    const [userArtist, setUserAritist] = useState<IArtist[]>([])
    const [length, setLength] = useState<number>(0)
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState<string>('')
    useEffect(() => {
        getUserSonglistByID(props.userInfo.userId, 16, 0).then(res => {
            setPlayList(res)
        });
        getUserLikelistByID(props.userInfo.userId).then(res => {
            getSongDetail(res).then(res => {
                setLength(res.songs.length < 12 ? res.songs.length : 12)
                setLikedNumber(res.songs.length)
                setLikedList(res.songs.slice(0, 12))
            })
        })
        getUserAlbumlist(20, 0).then(res => {
            setUserAlbum(res)
        })
        getUserArtistlist().then(res => {
            setUserAritist(res)
        })
    }, [])

    // 这里不使用歌词，而是使用网易云热评（在你的喜爱的音乐中）
    useEffect(() => {
        if (likedList.length !== 0) {
            const index = Math.floor(Math.random() * length)
            getHotComment({ id: likedList[index].id, type: 0, limit: 6 }).then(res => {
                let resComment = '';
                for (let item of res) {
                    if (item.content.length < 50) {
                        resComment = item.content;
                        setComment(item.content);
                        break;
                    }
                }
                if (resComment === '') {
                    setComment('太阳在坠落 海浪在发愁 你在干什么')
                }
            })
        }
    }, [likedList])

    return (
        <div className="library">
            <h1>
                <Avatar className="avatar">
                    <img src={props.userInfo.avatarUrl} />
                </Avatar>
                {props.userInfo.nickname + '的音乐库'}
            </h1>
            <div className="section-one">
                <LikeCard likedNumber={likedNumber} comment={comment} />
                <TrackList playlist={likedList!} />
            </div>

            <div className="section-two">
                <div className="tabs-row">
                    <div className="tabs">
                        <SelectTag />
                        {
                            props.tag.filter((tag: ITag) =>
                                !playlistOpt.includes(tag.name)
                            ).map((tag: ITag, index: number) => {
                                return (
                                    <Space key={index} wrap>
                                        <Tag checkable className="tag" checked={tag.isCheck} onCheck={() => {
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
                <UserLibrary playList={playList} userAlbum={userAlbum}
                    userArtist={userArtist} tag={props.tag}
                />

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
        </div >
    );
};


const mapStateToProps = (state: any) => {
    return {
        tag: state.libReducer,
        userInfo: state.userInfoReducer
    };
};

const mapDispatchToProps = {
    filterPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
