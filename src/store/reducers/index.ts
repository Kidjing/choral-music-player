import { createStore } from 'redux';


const musicReducer=(state = [], action:any)=>{
    if (action.type === 'SET_HAS_TOKEN'){
        return state;
    }
    return state;
}

export const store=createStore(musicReducer);