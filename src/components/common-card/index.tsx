import React, { useState } from 'react';
import { Card, Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import './index.less';

const { Meta } = Card;

interface CommonCardProps {
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

const CommonCard = (props: CommonCardProps) => {
    const { imgSrc, style,title, desc, shape="round", textPostion='left',goToAlbum } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <Card
            style={style}
            className="common-card"
            bordered={false}
            cover={
                <div
                    className="common-card-cover"
                    onMouseOver={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                >
                    <Button
                        onClick={() => {}}
                        className={classNames('play-button',isVisible?"":"")}
                        size="large"
                        shape="round"
                        icon={<IconCaretRight style={{ width:"80%",height:"80%"}} />}
                    />
                    <img
                        className="common-card-cover-img"
                        style={{ borderRadius: shape === 'round' ? '0.75em' : '50%' }}
                        alt="dessert"
                        src={imgSrc}
                        onClick={() => goToAlbum}
                    />
                </div>
            }
        >
            <Meta className="common-card-text" style={{justifyContent:textPostion}} title={<a href="">{title}</a>} description={desc} />
        </Card>
    );
};

export default CommonCard;
