import { Grid, Typography, Link, Card } from '@arco-design/web-react';
import FormCard from 'src/components/fm-card'
import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { search } from 'src/api/search';
import { IMusic } from 'src/api/types/song';

const SongSearch = () => {

    let [songList, setSongList] = useState<IMusic[]>();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 1, limit: 4 }).then(res => {
            setSongList(res.songs);
            console.log(songList);
        })
    }, [searchParams])


    return (
        <div>
            {songList?.map((item, index) => {
                return (
                    <FormCard key={index} title={item.name} artists={item.ar} imgSrc={item.al.picUrl} />
                )
            })}
        </div>
    )
}

export default SongSearch
