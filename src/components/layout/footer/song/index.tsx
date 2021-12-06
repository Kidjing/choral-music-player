import React from "react";
import { Button } from "@arco-design/web-react";
import { IconHeart } from '@arco-design/web-react/icon';
// import { Link } from "react-router-dom";

interface SongMsg {
    picture:string
    songName:string
    singer:string
    isCollected:string
}

const Song = (props:SongMsg) =>{
    return(
        <div style={{float:'left',marginLeft:'4%',width:'20%'}} >
            {/* <Link to='/Album'>
                <div style={{float:'left',height:46,width:46,borderRadius:5,background:'red'}}>
                    <img src={props.picture}  />
                </div>
            </Link>
            <div style={{float:'left',height:50,marginLeft:10}}>
                <Link to='/SongSheet' >
                    <text style={{height:20,fontSize:16}} >
                        {props.songName}
                    </text>
                </Link>
                <br/>
                <Link to='/Singer' >
                    <text style={{height:20,fontSize:10}} >
                        {props.singer}
                    </text>
                </Link>
            </div> */}
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
