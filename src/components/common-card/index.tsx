import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import './index.less';

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
    const { imgSrc, style, title, desc, shape = 'round', textPostion, goToAlbum } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <div style={style} className="common-card">
            <div
                className="common-card-cover"
                onMouseOver={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                <Button
                    onClick={() => {}}
                    className={classNames('play-button', isVisible ? '' : 'none')}
                    size="large"
                    shape="round"
                    icon={<IconCaretRight style={{ width: '80%', height: '80%' }} />}
                />
                <img
                    className="common-card-cover-img"
                    style={{ borderRadius: shape === 'round' ? '0.75em' : '50%' }}
                    alt="dessert"
                    src={imgSrc}
                    onClick={() => goToAlbum}
                />
            </div>
            <div
                className="common-card-text"
                style={{ justifyContent: textPostion}}
            >
                <div className="common-card-text-title" style={{width:textPostion==='left'?'100%':''}}>
                    <a href="">{title}</a>
                </div>
                <div className="common-card-text-info">
                    <span>{desc}</span>
                </div>
            </div>
        </div>
    );
};

export default CommonCard;
