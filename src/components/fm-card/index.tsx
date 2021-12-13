import { Button } from '@arco-design/web-react';
import { IArtistItem } from '../../api/types/song';
import { IconThumbDown, IconPlayArrow, IconPause,IconSkipNext } from '@arco-design/web-react/icon';
import './index.less';
import { useState } from 'react';

interface FmCardProps {
    imgSrc: string;
    title: string;
    artists: IArtistItem[];
}
const FmCard = (props: FmCardProps) => {
    const { imgSrc, title, artists } = props;
    const [play, setPlay] = useState(false);
    return (
        <div
            className="fm-card"
            style={{ background: 'linear-gradient(to left top, rgb(119, 127, 103), rgb(173, 169, 154))' }}
        >
            <img style={{ display: 'none' }} />
            <img className="fm-card-cover" src={imgSrc} />
            <div className="fm-card-right">
                <div className="info">
                    <div className="title">{title}</div>
                    <div className="artist">
                        {artists.map((item: IArtistItem, index: number) => {
                            if (index === artists.length - 1) {
                                return <a>{item.name} </a>;
                            } else {
                                return <a>{item.name},</a>;
                            }
                        })}
                    </div>
                </div>
                <div className="control">
                    <Button className="btn" icon={<IconThumbDown style={{ width: '100%', height: '100%' }} />} />
                    <Button className="btn" onClick={() => {setPlay(!play)}}>
                        {play?<IconPause style={{ width: '100%', height: '100%' }}/>:<IconPlayArrow style={{ width: '100%', height: '100%' }}/>}
                    </Button>
                    <Button className="btn" icon={<IconSkipNext style={{ width: '100%', height: '100%' }} />} />
                </div>
            </div>
        </div>
    );
};

export default FmCard;
