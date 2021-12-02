import { IAlbum } from './playlist';

export interface IGetAlbumResponse {
    album: IAlbum;
    songs: any[];
}
