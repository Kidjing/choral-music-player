import React, { useState } from 'react';
import { Card, Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import './index.less';

const { Meta } = Card;

interface FmCardProps {
    imgSrc: string;
    title?: string | React.ReactNode;
    titleSrc?: string;
    desc?: string | React.ReactNode;
    style?: React.CSSProperties;
    className?: string | string[];
    goToAlbum?: Function;
}

const FmCard = (props: FmCardProps) => {
    const { imgSrc, title, desc, goToAlbum } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <Card
            className="fm-card"
            hoverable
            bordered={false}
            cover={
                <div
                    className="fm-card-cover"
                    onMouseOver={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                >
                    <Button
                        onClick={() => {}}
                        className={classNames('play-button', isVisible ? '' : 'none')}
                        size="large"
                        shape="round"
                        icon={<IconCaretRight style={{ fontSize: 24 }} />}
                    />
                    <img className="fm-card-cover-img" alt="dessert" src={imgSrc} onClick={() => goToAlbum} />
                </div>
            }
        >
            <Meta className="fm-card-text" title={<a href="">{title}</a>} description={desc} />
        </Card>
    );
};

export default FmCard;
