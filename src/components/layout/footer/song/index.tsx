import React from "react";
import { Button } from "@arco-design/web-react";
import { IconHeart } from '@arco-design/web-react/icon';
import {useNavigate } from "react-router-dom";

interface SongMsg {
    picture:string
    songName:string
    singer:string
    isCollected?:string
}

const Song = (props:SongMsg) =>{
    const navigate = useNavigate()
    const [heart, setHeart] = React.useState<boolean>(false)
    return(
        <div style={{float:'left',marginLeft:'4%',width:'54%'}} >
            
            <div onClick={()=>{navigate('/album/?id=122524667')}} style={{cursor:'pointer',float:'left',height:46,width:46,borderRadius:5,border:'dashed'}}>
                <img src={props.picture}  />
            </div>
            
            <div style={{float:'left',height:50,marginLeft:10}}>
                <text onClick={()=>{navigate('/playlist/?id=6958793768')}} style={{cursor:'pointer',height:20,fontSize:16}} >
                    {props.songName}
                </text>
                <br/>
                <text onClick={()=>{navigate('/artist/?id=963431')}} style={{cursor:'pointer',height:20,fontSize:10}} >
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
