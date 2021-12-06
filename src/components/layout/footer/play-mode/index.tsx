import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconLoop, IconSwap } from '@arco-design/web-react/icon';
import { playingStore } from 'src/store/reducers/playingReducer';

import './index.less';

const PlayMode = () => {
    const [mode, setMode] = React.useState(0);
    let modes = ['PLAY_IN_ORDER', 'PLAY_IN_SINGLE', 'PLAY_IN_RANDOM'];
    const judgeMode = (mode: number) => {
        if (mode === 0)
            return (
                <div className="play-mode-loop-btn" title="列表循环">
                    <IconLoop style={{ fontSize: 26 }} />
                </div>
            );
        else if (mode === 1)
            return (
                <div className="play-mode-loop-btn" title="单曲循环">
                    <IconLoop style={{ fontSize: 26 }} />
                    <text style={{ fontSize: 10 }}>1</text>
                </div>
            );
        else
            return (
                <div className="play-mode-loop-btn" title="随机播放">
                    <IconSwap style={{ fontSize: 26 }} />
                </div>
            );
    };
    return (
        <div className="play-mode">
            <Button
                onClick={() => {
                    setMode((mode + 1) % 3);
                    const action = {
                        type: 'SET_PLAY_MODE',
                        playMode: modes[mode],
                    };
                    playingStore.dispatch(action);
                }}
            >
                {judgeMode(mode)}
            </Button>
        </div>
    );
};

export default PlayMode;
