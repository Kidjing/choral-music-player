import React from "react";
import { Slider } from "@arco-design/web-react";
import { IconSound, IconMute } from '@arco-design/web-react/icon';
import { playingStore } from "src/store/reducers/playingReducer";

import './index.less';

const PlayVolume = () => {
    const [volume,setVolume] = React.useState<number | number[]>(30);

    return(
        <div className="play-volume">
            {volume === 0? (
                <IconMute style={{margin:10,fontSize:40,height:50}}/>
            ) : (
                <IconSound style={{margin:10,fontSize:40,height:50}}/>
            )}
            <Slider value={volume} onChange={setVolume} onAfterChange={()=>{
                const action = {
                    type:'CHANGE_VOLUME',
                    playVolume:volume
                }
                playingStore.dispatch(action)}} />
        </div>
    )
}

export default PlayVolume
