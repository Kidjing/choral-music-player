import { connect } from 'react-redux';
import { Avatar } from '@arco-design/web-react';
import { MusicTable } from 'src/components';
import { useEffect, useState } from 'react';
import { getUserLikelistByID } from 'src/api/user';
import { getSongDetail } from 'src/api/song'
import { IMusic } from 'src/api/types/song';
import './index.less';

const UserSongs = (props: any) => {
    const [likedList, setLikedList] = useState<IMusic[]>([])
    useEffect(() => {
        getUserLikelistByID(props.userInfo.userId).then(res => {
            getSongDetail(res).then(res => {
                setLikedList(res.songs)
            })
        })
    }, [])
    return (
        <div className="user-songs">
            <h1>
                <Avatar className="avatar">
                    <img src={props.userInfo.avatarUrl} />
                </Avatar>
                {props.userInfo.nickname + '喜欢的音乐'}
            </h1>
            <MusicTable type="playlist" data={likedList} />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer
    };
};

export default connect(mapStateToProps)(UserSongs);
