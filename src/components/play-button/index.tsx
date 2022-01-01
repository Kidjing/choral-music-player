import React from 'react';
import { Button } from '@arco-design/web-react';
import { connect } from 'react-redux';
import { playMusic, setPlaylistInfo,changeStatus } from 'src/store/playing/reducer'
import { IconCaretRight } from '@arco-design/web-react/icon';
import './index.less'

interface IProps {
    id: number,
    type: string
}

const PlayButton = (props: any) => {

    const { id, type } = props.ownProps;

    return (
        <div>
            <Button
                onClick={() => {
                    props.playMusic(id, type) ;
                    props.setPlaylistInfo(id,type);
                    if(!props.status){
                        props.changeStatus();
                    }
                }}
                className='play-btn'
                icon={<IconCaretRight />}
            >
                播放
            </Button>
        </div>
    );
};



const mapStateToProps = (state: any ,ownProps: IProps) => {
    return {
        song: state.musicReducer,
        playing: state.playingReducer,
        status: state.musicStatusReducer,
        ownProps: ownProps
    };
};

const mapDispatchToProps = {
    setPlaylistInfo,
    playMusic,
    changeStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
