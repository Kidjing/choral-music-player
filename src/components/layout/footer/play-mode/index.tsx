import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconLoop, IconSwap } from '@arco-design/web-react/icon';
import { useDispatch } from 'react-redux';

import './index.less';

const PlayMode = () => {
    const dispatch = useDispatch();
    const [mode, setMode] = React.useState(0);
    let modes = ['PLAY_IN_ORDER', 'PLAY_IN_SINGLE', 'PLAY_IN_RANDOM'];
    const judgeMode = (mode: number) => {
        if (mode === 0)
            return (
                <Button className="footer-btn" title="列表循环">
                    <IconLoop style={{ fontSize: 20 }} />
                </Button>
            );
        else if (mode === 1)
            return (
                <Button className="footer-btn" title="单曲循环">
                    <IconLoop style={{ fontSize: 20 }} />
                    <text style={{ fontSize: 10 }}>1</text>
                </Button>
            );
        else
            return (
                <Button className="footer-btn" title="随机播放">
                    <IconSwap style={{ fontSize: 20 }} />
                </Button>
            );
    };
    return (
        <div
            className="play-mode"
            onClick={() => {
                setMode((mode + 1) % 3);
                dispatch({
                    type: 'SET_PLAY_MODE',
                    playMode: modes[(mode + 1) % 3],
                });
            }}
        >
            {judgeMode(mode)}
        </div>
    );
};

export default PlayMode;
