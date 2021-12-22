import { ACTIONS } from './actions';

const initState: Array<string> = [];

const searchRecordReducer = (state = initState, action: any) => {
    if (action.type === ACTIONS.ADD_RECORD) {
        if (state.includes(action.payload)) {
            return state;
        }
        if(state.length >= 7){
            state.pop()
        }
        return [action.payload, ...state]
    }
    if (action.type === ACTIONS.CLEAR_RECORD) {
        const res :Array<string> = []
        return res;
    }
    return state;
};

export const addRecord = (tag: string) => {
    return {
        type: 'ADD_RECORD',
        payload: tag,
    }
}
export const clearRecord = () => {
    return {
        type: 'CLEAR_RECORD',
    }
}

export default searchRecordReducer;
