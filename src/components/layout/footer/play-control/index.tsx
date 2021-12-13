import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconPlayArrow, IconSkipPrevious, IconSkipNext, IconPause } from '@arco-design/web-react/icon';

import './index.less';

const PlayControl = () => {
    const [isPlay, setValue] = React.useState('Playing');

    return (
        <div className="play-control">
            <Button className="play-control-btn">
                <IconSkipPrevious style={{ fontSize: 26 }} />
            </Button>
            <Button
                className="play-control-btn"
                onClick={() => {
                    setValue(isPlay === 'Playing' ? 'Suspending' : 'Playing');
                }}
            >
                {isPlay === 'Playing' ? (
                    <IconPause style={{ fontSize: 36 }} />
                ) : (
                    <IconPlayArrow style={{ fontSize: 36 }} />
                )}
            </Button>
            <Button className="play-control-btn">
                <IconSkipNext style={{ fontSize: 26 }} />
            </Button>
        </div>
    );
};

export default PlayControl;