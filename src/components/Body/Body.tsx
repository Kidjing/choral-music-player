import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Discover from "./Discover/Discover";
import MusicLibrary from "./MusicLibrary/MusicLibrary";
import SongSheet from "./SongSheet/SongSheet";
import Singer from "./Singer/Singer";
import Album from "./Album/Album";
import PlayList from "./PlayList/PlayList";
import WordsOfSong from "./WordsOfSong/WordsOfSong";

const Body = () =>{
    return(
        <div style={{position:'fixed',top:70,left:0}}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/HomePage' element={<HomePage />} />
                <Route path='/Discover' element={<Discover />} />
                <Route path='/MusicLibrary' element={<MusicLibrary/>}/>
                <Route path='/Album' element={<Album />} />
                <Route path='/SongSheet' element={<SongSheet />}/>
                <Route path='/Singer' element={<Singer/>} />
                <Route path='/PlayList'  element={<PlayList/>}/>
                <Route path='/WordsOfSong' element={<WordsOfSong/>}/>
            </Routes>
        </div>
    )
}

export default Body