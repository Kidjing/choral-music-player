import request from './axios';
import { store } from 'src/store/index'

// 收藏歌单 
// id为歌单id t为1收藏 t为2取消收藏
export const subscribePlaylist = async (id: number, t: number) => {
    const state = store.getState()
    if(state.userInfoReducer.status){
        await request({
            url: '/playlist/subscribe',
            params: {
                t,
                id,
            }
        });
        return true;
    }else{
        
        return false;
    }
};

// 收藏歌手
// id为歌单id t为1收藏 t为2取消收藏
export const subscribeArtist = async (id: number, t: number) => {
    const state = store.getState()
    if(state.userInfoReducer.status){
        await request({
            url: '/artist/sub',
            params: {
                t,
                id,
            }
        });
        return true;
    }else{
        return false;
    }
};

// 收藏歌手
// id为歌单id t为1收藏 t为2取消收藏
export const subscribeAlbum = async (id: number, t: number) => {
    const state = store.getState()
    if(state.userInfoReducer.status){
        await request({
            url: '/album/sub',
            params: {
                t,
                id,
            }
        });
        return true;
    }else{
        return false;
    }
};

// 喜欢歌曲
// id为歌单id like为true喜欢，like为false取消喜欢
export const subscribeSong = async (id: number,like: boolean) => {
    const state = store.getState()
    if(state.userInfoReducer.status){
        await request({
            url: '/like',
            params: {
                id,
                like,
            }
        });
        return true;
    }else{
        return false;
    }
};