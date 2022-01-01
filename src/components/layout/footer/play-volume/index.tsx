import React from "react";
import { Slider } from "@arco-design/web-react";
import { IconSound, IconMute } from '@arco-design/web-react/icon';
import { useStore ,connect} from "react-redux";

import './index.less';

const PlayVolume = (props: any) => {
    const store=useStore();

    return(
        <div className="play-volume">
            {props.volume === 0? (
                <IconMute style={{fontSize:20,marginRight:8}}/>
            ) : (
                <IconSound style={{fontSize:20,marginRight:8}}/>
            )}
            <Slider value={props.volume} onChange={(volume)=>{
                const action = {
                    type:'CHANGE_VOLUME',
                    playVolume:volume,
                }
                store.dispatch(action)}} />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        volume: state.playingReducer.volume,
    };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PlayVolume);
