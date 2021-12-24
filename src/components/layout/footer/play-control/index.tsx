import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconPlayArrow, IconSkipPrevious, IconSkipNext, IconPause } from '@arco-design/web-react/icon';

import './index.less';
import classNames from 'classnames';

const PlayControl = () => {
    const [isPlay, setValue] = React.useState('Playing');

    return (
        <div className="play-control">
            <Button className="play-control-btn">
                <IconSkipPrevious style={{ fontSize: 20 }} />
            </Button>
            <Button
                className={classNames('play-control-btn', 'play')}
                onClick={() => {
                    setValue(isPlay === 'Playing' ? 'Suspending' : 'Playing');
                }}
            >
                {isPlay === 'Playing' ? (
                    <IconPause style={{ width: '100%', height: '100%' }} />
                ) : (
                    <IconPlayArrow style={{ width: '100%', height: '100%' }} />
                )}
            </Button>
            <Button className="play-control-btn">
                <IconSkipNext style={{ fontSize: 20 }} />
            </Button>
        </div>
    );
};

export default PlayControl;
