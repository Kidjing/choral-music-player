import {IAlbum} from './album';
import {IArtist} from './artist';
import { IMusic, ISearchMusic } from './song';
import { ISonglist } from './songlist';

// 搜索所得到的结果
export interface ISuggestSearch{
    albums?: IAlbum[],
    artists?: IArtist[],
    songs?: ISearchMusic[],
    playlists?: ISonglist[]
    playlistCount?: number
}

export interface ISearchDetail{
    albums?: IAlbum[],
    artists?: IArtist[],
    songs?: IMusic[],
    playlists?: ISonglist[]
    playlistCount?: number
}
