import { IMusic } from 'src/api/types/song';
import { IAction } from 'src/store/type';
import { ACTIONS } from './actions';

const initsongList: IMusic[] = [
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

const seq: Array<number> = []

const initSonglistItem = {
    songlist: initsongList,
    seq,
}

const playInit = {
    playMode: 'PLAY_IN_ORDER',  // 歌曲播放的方式
    isCollected: 'NO_COLLECTED',
    playlistType: 'NULL',  // 播放列表的类型
    playlistId: -1,  // 播放列表的ID
    playlistIndex: 0,  // 歌曲在播放列表中的索引
    volume: 0, // 声音
    status: false,
}


export const playingReducer = (state = playInit, action: any) => {
    if (action.type === ACTIONS.SET_PLAY_MODE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.playMode = action.playMode;
        return newState;
    }
    if (action.type === ACTIONS.SET_PLAY_MODE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.volume = action.playVolume;
        return newState;
    }
    if (action.type === ACTIONS.CHANGE_STATUS) {
        let newState = { ...state };
        newState.status = !state.status;
        return newState;
    }
    if (action.type === 'SET_PLAYLIST_INFO') {
        let newState = { ...state }
        newState.playlistType = action.payload.type;
        newState.playlistId = action.payload.id;
        return newState;
    }
    if (action.type === ACTIONS.CHANGE_PLAYLIST_INDEX) {
        const seq = action.payload.seq;
        const len = seq.length;
        let newState = { ...state }
        
        if (action.payload.type === 0) {
            newState.playlistIndex = (state.playlistIndex + 1) % len;
        } else {
            newState.playlistIndex = ((state.playlistIndex - 1) % len + len) % len;
        }

        return newState;
    }
    return state;
}

export const musicReducer = (state = initSonglistItem, action: IAction<IMusic[]>) => {
    if (action.type === 'GET_SONGLIST') {
        let newState = { ...state };
        newState.songlist = action.payload;
        newState.seq = [...Array(action.payload.length).keys()].sort(() => Math.random() - 0.5);
        return newState;
    }
    return state;
}




export const getSongList = (songList: IMusic[]) => {
    return {
        type: "GET_SONGLIST",
        payload: songList
    }
}

// 改变播放状态
export const changeStatus = () => {
    return {
        type: "CHANGE_STATUS",
    }
}

// 设置播放列表的详情信息
export const setPlaylistInfo = (id: number, type: string) => {
    return {
        type: "SET_PLAYLIST_INFO",
        payload: {
            id: id,
            type: type
        }
    }
}

// type为0选择下一首，为1选择上一首
export const changePlaylistIndex = (type: number,seq: number[]) => {
    return {
        type: "CHANGE_PLAYLIST_INDEX",
        payload: {
            type,
            seq
        }
    }
}

export const playMusic = (id: number, type: string) => {
    return {
        type: "PLAY",
        payload: {
            id: id,
            type: type
        }
    }
}



