import React from "react";
import { Button } from "@arco-design/web-react";
import { IconHeart } from '@arco-design/web-react/icon';
import {useNavigate } from "react-router-dom";

interface SongMsg {
    picture:string
    songName:string
    singer:string
    isCollected:string
}

const Song = (props:SongMsg) =>{
    const navigate = useNavigate()
    return(
        <div style={{float:'left',marginLeft:'4%',width:'20%'}} >
            
            <div onClick={()=>{navigate('/album?id=122524667')}} style={{cursor:'pointer',float:'left',height:46,width:46,borderRadius:5,background:'red'}}>
                <img src={props.picture}  />
            </div>
            
            <div style={{float:'left',height:50,marginLeft:10}}>
                <text onClick={()=>{navigate('/playlist?id=6958793768')}} style={{cursor:'pointer',height:20,fontSize:16}} >
                    {props.songName}
                </text>
                <br/>
                <text onClick={()=>{navigate('/artist?id=963431')}} style={{cursor:'pointer',height:20,fontSize:10}} >
                    {props.singer}
                </text>
            </div>
            <Button style={{float:'left',height:50,display:'flex',alignItems:'center',border:'none',backgroundColor:'#f5f5f4'}} title='收藏'>
                {props.isCollected === 'true'?(
                    <IconHeart style={{fontSize:26,color:'red'}}/>
                ) : (
                    <IconHeart style={{fontSize:26}}/>
                )}
            </Button>
        </div>
    )
}

export default Song
