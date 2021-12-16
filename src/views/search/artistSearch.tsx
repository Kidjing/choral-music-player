import { useSearchParams } from 'react-router-dom';
import { search } from 'src/api/search';
import { IArtist } from 'src/api/types/artist';
import React, { useState, useEffect } from 'react';
import { Grid,Typography,Link } from '@arco-design/web-react';
import { CommonCard } from 'src/components';
import './index.less';


const Row = Grid.Row;
const Col = Grid.Col;


const ArtistSearch = () => {
    let [artistList, setArtistList] = useState<IArtist[]>();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({key,type:100,limit:4}).then(res => {
            setArtistList(res.artists);
        })
    }, [searchParams])
    return (
        <div>
            <div className='search-artist-text'>
                <Typography.Title heading={3}>艺人</Typography.Title>
                <Link>查看全部</Link>
            </div>
            <Row gutter={[20, 24]}>
                {artistList ? artistList.map((item, index) => {
                    return (
                        <Col key={index} span={6}>
                            <CommonCard
                                imgSrc={item.picUrl}
                                title={item.name}
                                shape="circle"
                                textPostion="center"
                            />
                        </Col>
                    );
                }) : null}
            </Row>
        </div>)
}
export default ArtistSearch