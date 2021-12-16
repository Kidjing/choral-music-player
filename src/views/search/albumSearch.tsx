import { useSearchParams } from 'react-router-dom';
import { search } from 'src/api/search';
import { IAlbum } from 'src/api/types/album';
import React, { useState, useEffect } from 'react';


const AlbumSearch = () => {
    let [albumList, setAlbumList] = useState<IAlbum[]>();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({key,type:10,limit:10}).then(res => {
            setAlbumList(res.albums);
        })
    },[searchParams])
    return (
        <div>
            {albumList ? albumList.map((item, index) => {
                return (<div key={index}>{item.name}</div>)
            }) : null}
        </div>)
}
export default AlbumSearch