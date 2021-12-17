import { Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import './index.less'

const LikeCard = () => {
    return (
        <div className="like-card">
            <div className="top">
                <p>
                    <span>Hello world</span><br/>
                    <span>Hello world</span><br/>
                    <span>Hello world</span>
                </p>
            </div>
            <div className="bottom">
                <div className='titles'>
                    <div className='title'>
                        我喜欢的音乐
                    </div>
                    <div className='sub-title'>
                        84首歌
                    </div>
                </div>
                <Button className="play-btn" icon={<IconCaretRight style={{ width:"80%",height:"80%" }} />}/>
            </div>
        </div>
    );
};

export default LikeCard;