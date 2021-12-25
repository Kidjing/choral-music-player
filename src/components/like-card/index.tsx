import { Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import './index.less'
import { useNavigate } from 'react-router-dom'

interface IProps {
    likedNumber: number,
    comment: string,
}

const LikeCard = (props: IProps) => {
    const navigate = useNavigate();
    return (
        <div className="like-card" onClick={() => { navigate('/library/songs') }}>
            <div className="top">
                <p>
                    <p>{props.comment}</p>
                </p>
            </div>
            <div className="bottom">
                <div className='titles'>
                    <div className='title'>
                        我喜欢的音乐
                    </div>
                    <div className='sub-title'>
                        {props.likedNumber}首歌
                    </div>
                </div>
                <Button className="play-btn" icon={<IconCaretRight style={{ width: "80%", height: "80%" }} />} />
            </div>
        </div>
    );
};

export default LikeCard;