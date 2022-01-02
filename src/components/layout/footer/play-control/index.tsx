import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconPlayArrow, IconSkipPrevious, IconSkipNext, IconPause } from '@arco-design/web-react/icon';
import { getFm } from 'src/store/fm-card/reducer';

import './index.less';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeStatus, changePlaylistIndex } from 'src/store/playing/reducer';

interface IProps {
    detail: boolean;
}

const PlayControl = (props: any) => {
    const cls = props.own.detail ? 'play-control-btn-white' : 'play-control-btn';
    const nextMusic = () => {
        if (props.type === 'FM') {
            props.getFm(props.userInfo);
        } else {
            props.changePlaylistIndex(0, props.playlistItem.seq.length);
        }
    };

    return (
        <div className="play-control">
            <Button
                onClick={() => {
                    props.changePlaylistIndex(1, props.playlistItem.seq.length);
                }}
                className={cls}
                disabled={props.type === 'FM'}
            >
                <IconSkipPrevious style={{ fontSize: 20 }} />
            </Button>
            <Button
                className={classNames(cls, 'play')}
                onClick={() => {
                    props.changeStatus();
                }}
            >
                {props.status ? (
                    <IconPause style={{ width: '100%', height: '100%' }} />
                ) : (
                    <IconPlayArrow style={{ width: '100%', height: '100%' }} />
                )}
            </Button>
            <Button
                onClick={() => {
                    nextMusic();
                }}
                className={cls}
            >
                <IconSkipNext style={{ fontSize: 20 }} />
            </Button>
        </div>
    );
};

const mapStateToProps = (state: any, own: IProps) => {
    return {
        userInfo: state.userInfoReducer,
        status: state.musicStatusReducer,
        type: state.playingReducer.playlistType,
        personalFm: state.personalFmReducer,
        playlistItem: state.musicReducer,
        own,
    };
};

const mapDispatchToProps = { changeStatus, changePlaylistIndex, getFm };

export default connect(mapStateToProps, mapDispatchToProps)(PlayControl);
