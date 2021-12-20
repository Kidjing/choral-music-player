import { useSearchParams } from 'react-router-dom';
import { search } from 'src/api/search';
import { IAlbum } from 'src/api/types/album';
import React, { useState, useEffect } from 'react';
import { Grid } from '@arco-design/web-react';
import { CommonCard } from 'src/components';



const Row = Grid.Row;
const Col = Grid.Col;


const AlbumSearch = () => {
    let [albumList, setAlbumList] = useState<IAlbum[]>();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 10, limit: 4 }).then(res => {
            setAlbumList(res.albums);
        })
    }, [searchParams])
    return (
        <div>
            <div className="title">专辑
                <a href='explore/?category=推荐歌单'>查看全部</a>
            </div>
            <Row gutter={[30, 40]} className='card'>
                {albumList ? albumList.map((item, index) => {
                    return (
                        <Col key={index} span={6}>
                            <CommonCard
                                imgSrc={item.picUrl}
                                title={item.name}
                            />
                        </Col>
                    );
                }) : null}
            </Row>
        </div>
    )
}
export default AlbumSearch