import React from "react";
import { Button } from "@arco-design/web-react";
import { IconLoop, IconSwap} from '@arco-design/web-react/icon';
import { playingStore } from "src/store/reducers/playingReducer";

const PlayMode = () => {
    const [mode,setMode] = React.useState(0);
    var modes=['PLAY_IN_ORDER','PLAY_IN_SINGLE','PLAY_IN_RANDOM']
    var playMode =[<div style={{width:30}} title='列表循环'><IconLoop style={{fontSize:26}}/></div>,
                    <div style={{width:30}} title='单曲循环'><IconLoop style={{fontSize:26}}></IconLoop><text style={{fontSize:10}}>1</text></div>,
                    <div style={{width:30}} title='随机播放'><IconSwap style={{fontSize:26}}/></div>]

    return(
        <Button style={{float:'left',height:50,display:'flex',alignItems:'center',border:'none',backgroundColor:'#f5f5f4'}}
        onClick={()=>{
            setMode((mode+1)%3)
            const action = {
                type:'SET_PLAY_MODE',
                playMode:modes[mode]
            }
            playingStore.dispatch(action)
            }}>
            {playMode[mode]}
        </Button>
    )
}

export default PlayMode
