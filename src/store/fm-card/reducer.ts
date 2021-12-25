import { IAction } from '../type';
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
];

export const personalFmReducer = (state = initState, action: IAction<IFmMusic[]>) => {
    if (action.type === 'PUSH_FM') {
        if (state.length === 1) {
            return action.payload;
        }
        return [...state, ...action.payload];
    }
    if (action.type === 'GET_FM') {
        let newState=state.concat();
        if (state.length === 1) {
            return state
        }
        newState = state.slice(1);
        return newState;
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
