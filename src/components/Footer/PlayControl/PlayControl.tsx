import React from "react";
import { Slider, Layout, Button } from "@arco-design/web-react";
import { IconPlayArrow,IconSkipPrevious,IconSkipNext, IconPause } from '@arco-design/web-react/icon';

const PlayControl = () =>{
    const [isPlay,setValue] = React.useState('Playing')

    return(
        <div style={{float:'left',height:50,width:'50%',textAlign:'center'}}>
            <Button style={{height:50}} >
                <IconSkipPrevious style={{fontSize:26}} />
            </Button>
            <Button style={{height:50}} onClick={()=>{setValue((isPlay=='Playing')? 'Suspending' : 'Playing')}} >
                {isPlay == 'Playing'?(
                    <IconPause style={{fontSize:36}} />
                ) : (
                    <IconPlayArrow style={{fontSize:36}} />
                    )
                }
            </Button>
            <Button style={{height:50}}>
            <IconSkipNext style={{fontSize:26}} />
            </Button>
        </div>
    )
}

export default PlayControl
