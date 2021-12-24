import { Grid } from '@arco-design/web-react';
import { Track } from 'src/components/track-list';
import { useSearchParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { search } from 'src/api/search';
import { IMusic } from 'src/api/types/song';

const Row = Grid.Row;
const Col = Grid.Col;


const SongSearch = () => {
    const navigate = useNavigate();
    let [songList, setSongList] = useState<IMusic[]>();
    const [searchParams] = useSearchParams();
    const key = searchParams.get('keyword')!;
    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 1, limit: 16 }).then(res => {
            setSongList(res.songs);
        })

    }, [searchParams])


    return (
        <div>

            {songList ? <div>
                <div className="title">歌曲
                    <a onClick={() => navigate('song?keyword=' + key)}>查看全部</a>
                </div>
                <Row gutter={[4, 4]}>
                    {songList.map((item, index) => {
                        return (
                            <Col key={index} span={6}>
                                <Track album={item} />
                            </Col>
                        );
                    })}
                </Row>
            </div> : null}
        </div>
    )
}

export default SongSearch
