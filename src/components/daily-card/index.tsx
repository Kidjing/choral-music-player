import { Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';

import './index.less';

interface DailyCardProps{
    imgSrc:string;

}
const DailyCard = (props:DailyCardProps) => {
    const {imgSrc}=props
    return (
        <div className="daily-card">
            <img src={imgSrc} />
            <div className="title-box">
                <div className="title">
                    <span>每</span>
                    <span>日</span>
                    <span>推</span>
                    <span>荐</span>
                </div>
            </div>
            <Button className="play-btn" icon={<IconCaretRight style={{ width:"80%",height:"80%" }} />}/>
        </div>
    );
};

export default DailyCard;