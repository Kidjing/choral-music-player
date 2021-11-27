export const setHasToken=(hasToken:string)=>{
    return {
        type: 'SET_HAS_TOKEN',
        hasToken,
    };
}