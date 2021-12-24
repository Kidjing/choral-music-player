
import { useEffect, useState } from "react";
import {  MusicTable } from "src/components";
import { useSearchParams } from 'react-router-dom';
import { search } from 'src/api/search';
import { IMusic } from "src/api/types/song";




const SongSearch = () => {
    let [songs, setSongs] = useState<IMusic[]>([]);

    const [searchParams] = useSearchParams();
    const key = searchParams.get('keyword')!;

    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 1, limit: 100 }).then(res => {
            setSongs(res.songs!);
        })
    }, [searchParams])
    return (
        <div>
            <div className="search-title">搜索 歌曲{' \' ' + key + ' \' '}</div>
            <MusicTable type="playlist" data={songs} />
        </div>
    );
};

export default SongSearch;
