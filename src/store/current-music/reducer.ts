import { ACTIONS } from './actions';
import { IMusic } from 'src/api/types/song';

const initMusic: IMusic = {
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
};

export const currentMusicReducer = (state = initMusic,action: any) => {
    if (action.type === ACTIONS.SET_CURRENT_MUSIC) {
        return action.payload
    }
    return state;
}

export const setCurrentMusic = (music:IMusic) => {
    
    return {
        type: "SET_CURRENT_MUSIC",
        payload: music
    }
}
