import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconLoop, IconSwap } from '@arco-design/web-react/icon';
import { useDispatch, connect } from 'react-redux';

import './index.less';

const PlayMode = (props: any) => {
    const dispatch = useDispatch();
    let modes = ['PLAY_IN_ORDER', 'PLAY_IN_SINGLE', 'PLAY_IN_RANDOM'];
    const index = modes.indexOf(props.playing.playMode)
    const [mode, setMode] = React.useState<number>(index);
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

const mapStateToProps = (state: any) => {
    return {
        song: state.musicReducer,
        playing: state.playingReducer,
        status: state.musicStatusReducer,
    };
};

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayMode);