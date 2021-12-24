import { IMusic } from 'src/api/types/song';
import { IAction } from 'src/types/actions';
import { ACTIONS } from './actions';

const playControl = {
    playMode:'PLAY_IN_ORDER',
    isCollected:'NO_COLLECTED',
    volume:0,
}


export const playingReducer = (state=playControl,action:any) =>{
    if(action.type===ACTIONS.SET_PLAY_MODE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.playMode = action.playMode;
        return newState;
    }
    if(action.type === ACTIONS.SET_PLAY_MODE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.volume = action.playVolume;
        return newState;
    }
    return state
}

const initsongList:IMusic[]=[
    {
        name: '西楼别序',
        id: 1811662859,
        ar: [
            {
                id: 12316248,
                name: '尹昔眠',
            },
            {
                id: 12852319,
                name: '小田音乐社',
            },
        ],
        al: {
            id: 121583259,
            name: '西楼别序',
            picUrl: 'http://p3.music.126.net/Yf2hFsTV3RRETpiKtCgbbA==/109951165762720351.jpg',
            pic_str: '109951165762720351',
            pic: 109951165762720350,
        },
        dt: 227422,
        publishTime: 1610899200000,
    },
]

export const musicReducer=(state=initsongList,action:IAction<IMusic[]>)=>{
    if(action.type==='GET_SONGLIST'){
        return action.payload
    }
    return state;
}

export const playStatusReducer=(state=false,action:IAction<boolean>)=>{
    if(action.type==='CHANGE_STATUS'){
        return !action.payload;
    }
    return state;
}

export const getSongList=(songList:IMusic[])=>{
    return {
        type:"GET_SONGLIST",
        payload:songList
    }
}

export const playMusic=(id:number,type:string)=>{
    return {
        type:"PLAY",
        payload:{
            id:id,
            type:type
        }
    }
}

export const changeStatus=(status:boolean)=>{
    return {
        type:"CHANGE_STATUS",
        payload:status,
    }
}