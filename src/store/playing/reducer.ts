import { ACTIONS } from './actions';

const playControl = {
    playMode:'PLAY_IN_ORDER',
    isCollected:'NO_COLLECTED',
    volume:0,
}

const playingReducer = (state=playControl,action:any) =>{
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

export default playingReducer;
