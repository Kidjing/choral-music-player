import { useSearchParams, useNavigate } from 'react-router-dom';
import { search } from 'src/api/search';
import { ISonglist } from 'src/api/types/songlist';
import React, { useState, useEffect } from 'react';
import { Grid } from '@arco-design/web-react';
import { CommonCard } from 'src/components';

const Row = Grid.Row;
const Col = Grid.Col;

const PlaylistSearch = () => {
    const navigate = useNavigate();
    let [songList, setPlaylistList] = useState<ISonglist[]>();
    const [searchParams] = useSearchParams();
    const key = searchParams.get('keyword')!;

    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 1000, limit: 12 }).then(res => {
            setPlaylistList(res.playlists);
        })
    }, [searchParams])
    return (
        <div>
            {songList ? <div className="title">歌单
                <a onClick={() => navigate('playlist?keyword=' + key)}>查看全部</a>

            </div> : null}
            <Row gutter={[20, 20]} className='card'>
                {songList ? songList.map((item, index) => {
                    return (
                        <Col key={index} span={4}>
                            <CommonCard
                                imgSrc={item.coverImgUrl}
                                title={item.name}
                                id={item.id}
                                desc={item.description}
                                type="playlist"
                                textPostion="left"
                            />
                        </Col>
                    );
                }) : null}
            </Row>
        </div>
    )
}
export default PlaylistSearch