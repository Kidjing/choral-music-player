import { Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './index.less';

const DailyCard = (props: any) => {
    const navigate = useNavigate();
    const handleDaily = () => {
        if (props.userInfo.status) {
            navigate('/daily/songs');
        } else {
            navigate('/login/qr');
        }
    };

    return (
        <div className="daily-card">
            <div onClick={handleDaily}>
                <img loading='lazy' src={props.dailyPlayList[0].al.picUrl} />
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
        dailyPlayList:state.dailySongsReducer,
    }
};

export default connect(mapStateToProps)(DailyCard);