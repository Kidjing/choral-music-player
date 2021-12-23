import { Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDailyPlaylist } from 'src/api/songlist';
import { IMusic } from 'src/api/types/song';

import './index.less';

const DailyCard = (props: any) => {
    const navigate = useNavigate();
    const [dailyList, setDailyList] = useState<IMusic[]>([]);
    const defaultCovers = 'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg';

    const handleDaily = () => {
        if (props.userInfo.status) {
            getDailyPlaylist()
                .then((res) => {
                    setDailyList(res);
                });
            navigate('daily/songs');
        } else {
            console.log('asdasfasf');
            navigate('login/qr');
        }
    };

    return (
        <div className="daily-card">
            <div onClick={handleDaily}>
                <img src={dailyList[0] ? dailyList[0].al.picUrl : defaultCovers} />
                <div className="title-box">
                    <div className="title">
                        <span>每</span>
                        <span>日</span>
                        <span>推</span>
                        <span>荐</span>
                    </div>
                </div>
            </div>
            <Button
                className="play-btn"
                onClick={() => {}}
                icon={<IconCaretRight style={{ width: '80%', height: '80%' }} />}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(DailyCard);
