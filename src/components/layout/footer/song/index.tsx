import React from "react";
import { Button } from "@arco-design/web-react";
import { IconHeart } from '@arco-design/web-react/icon';

interface SongMsg {
    picture:string
    songName:string
    singer:string
    isCollected?:string
}

const Song = (props:SongMsg) =>{
    const [heart, setHeart] = React.useState<boolean>(false)
    return(
        <div style={{float:'left',marginLeft:'4%',width:'54%'}} >
            
            <div style={{cursor:'pointer',float:'left',height:46,width:46,borderRadius:5,border:'dashed'}}>
                <img src={props.picture}  />
            </div>
            
            <div style={{float:'left',height:50,marginLeft:10}}>
                <text style={{cursor:'pointer',height:20,fontSize:16}} >
                    {props.songName}
                </text>
                <br/>
                <text style={{cursor:'pointer',height:20,fontSize:10}} >
                    {props.singer}
                </text>
            </div>
            <Button style={{float:'left',height:50,display:'flex',alignItems:'center',border:'none',backgroundColor:'transparent'}} title='收藏'>
                {heart?(
                    <IconHeart onClick={()=>{setHeart(!heart)}} style={{fontSize:26,color:'red'}}/>
                ) : (
                    <IconHeart onClick={()=>{setHeart(!heart)}} style={{fontSize:26}}/>
                )}
            </Button>
        </div>
    )
}

export default Song
