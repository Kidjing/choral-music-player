import { IAction } from '../../types/actions';
import { IFmMusic } from '../../api/types/song';
import { UserInfo } from 'src/api/types/user';

const initState: IFmMusic[] = [
    {
        name: '如果这都不算爱',
        id: 188432,
        artists: [
            {
                name: '张学友',
                id: 6460,
            },
        ],
        album: {
            name: '学友 热',
            id: 19076,
            pic: 19047939439853430,
            picUrl: 'http://p3.music.126.net/blZlhdVmYSUwgqSUxFs88Q==/19047939439853431.jpg',
        },
        duration: 215773,
        
    },
    {
        name: "Nothing's Gonna Stop Us Now",
        id: 21680447,
        artists: [
            {
                name: 'Starship',
                id: 74939,
            },
        ],
        album: {
            name: 'No Protection',
            id: 1995776,
            pic: 109951166677563220,
            picUrl: 'http://p4.music.126.net/fNjCgSDoEegZWgKD2UGjaA==/109951166677563218.jpg',
        },
        duration: 270367,
    },
    {
        name: '锦鲤抄',
        id: 28188434,
        artists: [
            {
                name: '银临',
                id: 188565,
            },
            {
                name: '云の泣',
                id: 981005,
            },
        ],
        album: {
            name: '腐草为萤',
            id: 2742059,
            pic: 5859297464524710,
            picUrl: 'http://p4.music.126.net/LBnYDAUED2mD1veBvBnC8g==/5859297464524710.jpg',
        },
        duration: 245120,
    },
];

export const personalFmReducer = (state = initState, action: IAction<IFmMusic[]>) => {
    if (action.type === 'PUSH_FM') {
        return [...state,...action.payload];
    }
    if (action.type === 'GET_FM') {
        const newState=state.concat();
        newState.shift();
        return [...newState];
    }
    return state;
};

export const pushFm = (FmPlaylist: IFmMusic[]) => {
    return {
        type: 'PUSH_FM',
        payload: FmPlaylist,
    };
};

export const getFm = (userInfo: UserInfo[]) => {
    return {
        type: 'GET_FM',
        payload: userInfo,
    };
};
