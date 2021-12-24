import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconPlayArrow, IconSkipPrevious, IconSkipNext, IconPause } from '@arco-design/web-react/icon';

import './index.less';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeStatus } from 'src/store/playing/reducer';

const PlayControl = (props: any) => {
    return (
        <div className="play-control">
            <Button className="play-control-btn">
                <IconSkipPrevious style={{ fontSize: 20 }} />
            </Button>
            <Button
                className={classNames('play-control-btn', 'play')}
                onClick={() => {
                    props.changeStatus(props.playStatus);
                }}
            >
                {props.playStatus ? (
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

const mapStateToProps = (state: any) => {
    return {
        playStatus: state.playStatusReducer,
    };
};

const mapDispatchToProps = { changeStatus };

export default connect(mapStateToProps, mapDispatchToProps)(PlayControl);
