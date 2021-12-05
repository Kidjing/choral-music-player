import React from "react";
import { Link } from "react-router-dom";
import { Layout, Button } from "@arco-design/web-react";
import { IconMenu, IconUp } from '@arco-design/web-react/icon';
import PlayMode from "./PlayMode/PlayMode";
import PlayVolume from "./PlayVolume/PlayVolume";
import PlayControl from "./PlayControl/PlayControl";
import Song from "./Song/Song";

const Foot = Layout.Footer

const Footer = () => {
    return(
        <Foot style={{position:'fixed',width:'100%',bottom:0,right:0,backgroundColor:'#f5f5f4',height:50}}>
            <Song picture='src\assets\zjl.jpg' songName='songName' singer='singer' isCollected='true'  />
            <PlayControl/>
            <PlayList />
            <PlayMode />
            <PlayVolume />
            <WordsOfSong />
        </Foot>
    )
}

const PlayList = () =>{
    return(
        <Link to='/PlayList'>
            <Button style={{float:'left',height:50,display:'flex',alignItems:'center',border:'none',backgroundColor:'#f5f5f4'}} title='播放列表'>
                <IconMenu style={{fontSize:26}} />
            </Button>
        </Link>
    )
}

const WordsOfSong = () =>{
    return(
        <Link to='/WordsOfSong'>
            <Button  style={{float:'left',height:50,display:'flex',alignItems:'center',border:'none',backgroundColor:'#f5f5f4'}} title='歌词'>
                <IconUp style={{fontSize:26}} />
            </Button >
        </Link>
    )
}

export default Footer
