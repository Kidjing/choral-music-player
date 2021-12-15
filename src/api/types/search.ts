import {IAlbum} from './album';
import {IArtist} from './artist';
import { ISearchMusic } from './song';
import { ISonglist } from './songlist';

// 搜索所得到的结果
export interface ISuggestSearch{
    albums: IAlbum[],
    artists: IArtist[],
    songs: ISearchMusic[],
    playlists: ISonglist[]
}

