import { Button } from '@arco-design/web-react';
import { IArtistItem } from '../../api/types/song';
import { IconThumbDown, IconPlayArrow, IconPause, IconSkipNext } from '@arco-design/web-react/icon';
import './index.less';
import { useState } from 'react';

const FmCard = (props: any) => {
    const [play, setPlay] = useState(false);
    const defaultFM = {
        imgSrc: 'https://p4.music.126.net/5AQU0WlqeDsA5XSDVaXTqA==/4420036743669830.jpg?param=512y512',
        title: 'MOM',
        artists: [
            {
                id: 12260125,
                name: 'Regard',
            },
        ],
    };
    return (
        <div
            className="fm-card"
            style={{ background: 'linear-gradient(to left top, rgb(119, 127, 103), rgb(173, 169, 154))' }}
        >
            <img className="fm-card-cover" src={defaultFM.imgSrc} />
            <div className="fm-card-right">
                <div className="info">
                    <div className="title">{defaultFM.title}</div>
                    <div className="artist">
                        {defaultFM.artists.map((item: IArtistItem, index: number) => {
                            if (index === defaultFM.artists.length - 1) {
                                return <a>{item.name} </a>;
                            } else {
                                return <a>{item.name},</a>;
                            }
                        })}
                    </div>
                </div>
                <div className="control">
                    <Button className="btn" icon={<IconThumbDown style={{ width: '100%', height: '100%' }} />} />
                    <Button
                        className="btn"
                        onClick={() => {
                            setPlay(!play);
                        }}
                    >
                        {play ? (
                            <IconPause style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <IconPlayArrow style={{ width: '100%', height: '100%' }} />
                        )}
                    </Button>
                    <Button className="btn" icon={<IconSkipNext style={{ width: '100%', height: '100%' }} />} />
                </div>
            </div>
        </div>
    );
};

export default FmCard;
