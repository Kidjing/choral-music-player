import { ACTIONS } from './actions';
import { UserInfo } from 'src/api/types/user'

const initState: UserInfo ={
    userId: 0,
    avatarUrl: '',
    nickname: '',
    status: false,
};

const userInfoReducer = (state = initState, action: any) => {
    if (action.type === ACTIONS.SET_INFO) {
        return action.payload
    }
    if (action.type === ACTIONS.CLEAR_INFO) {
        return {
            userId: 0,
            avatarUrl: '',
            nickname: '',
            status: false,
        }
    }
    return state;
};

export const setInfo = (user: UserInfo) => {
    return {
        type: 'SET_INFO',
        payload: user,
    }
}
export const clearInfo = () => {
    return {
        type: 'CLEAR_INFO',
    }
}

export default userInfoReducer;
