import { useSearchParams, useNavigate } from 'react-router-dom';
import { search } from 'src/api/search';
import { IArtist } from 'src/api/types/artist';
import React, { useState, useEffect } from 'react';
import { Grid } from '@arco-design/web-react';
import { CommonCard } from 'src/components';
import './index.less';


const Row = Grid.Row;
const Col = Grid.Col;


const ArtistSearch = () => {
    let [artistList, setArtistList] = useState<IArtist[]>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const key = searchParams.get('keyword')!;
    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 100, limit: 4 }).then(res => {
            setArtistList(res.artists);
        })
    }, [searchParams])
    return (
        <div>
            <div className="title">艺人
                <a onClick={() => navigate('artist?keyword=' + key)}>查看全部</a>
            </div>
            <Row gutter={[30, 40]} className='card'>
                {artistList ? artistList.map((item, index) => {
                    return (
                        <Col key={index} span={6}>
                            <CommonCard
                                imgSrc={item.picUrl}
                                title={item.name}
                                id={item.id}
                                type='artist'
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