import React, { useState } from 'react';
import { Card, Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import './index.less';

const { Meta } = Card;

interface FmCardProps {
    imgSrc: string;
    shape?: 'circle' | 'round';
    textPostion?: 'left' | 'center' | 'right';
    title?: string | React.ReactNode;
    titleUrl?: string;
    desc?: string | React.ReactNode;
    style?: React.CSSProperties;
    className?: string | string[];
    goToAlbum?: Function;
}

const FmCard = (props: FmCardProps) => {
    const { imgSrc, style,title, desc, shape="round", textPostion='left',goToAlbum } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <Card
            style={style}
            className="fm-card"
            bordered={false}
            cover={
                <div
                    className="fm-card-cover"
                    onMouseOver={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                >
                    <Button
                        onClick={() => {}}
                        className={classNames('play-button',isVisible?"":"none")}
                        size="large"
                        shape="round"
                        icon={<IconCaretRight style={{ width:"70%",height:"70%" }} />}
                    />
                    <img
                        className="fm-card-cover-img"
                        style={{ borderRadius: shape === 'round' ? '0.75em' : '50%' }}
                        alt="dessert"
                        src={imgSrc}
                        onClick={() => goToAlbum}
                    />
                </div>
            }
        >
            <Meta className="fm-card-text" style={{justifyContent:textPostion}} title={<a href="">{title}</a>} description={desc} />
        </Card>
    );
};

export default FmCard;
