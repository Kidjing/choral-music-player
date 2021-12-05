import React from "react";
import { Slider } from "@arco-design/web-react";
import { IconSound, IconMute } from '@arco-design/web-react/icon';
import { playingStore } from "src/store/reducers/playingReducer";

const PlayVolume = () => {
    const [volume,setVolume] = React.useState<number | number[]>(30);

    return(
        <div style={{float:'left',width:'10%',height:50,display:'flex',alignItems:'center'}}>
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
