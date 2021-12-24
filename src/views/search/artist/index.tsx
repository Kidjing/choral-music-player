
import { Grid } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { IArtist } from 'src/api/types/artist';
import { CommonCard } from "src/components";
import { useSearchParams } from 'react-router-dom';
import { search } from 'src/api/search';


const Row = Grid.Row;
const Col = Grid.Col;

const ArtistSearch = () => {
    let [artistList, setArtistList] = useState<IArtist[]>([]);

    const [searchParams] = useSearchParams();
    const key = searchParams.get('keyword')!;

    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 100, limit: 30 }).then(res => {
            setArtistList(res.artists!);
        })
    }, [searchParams])
    return (
        <div>
            <div className="search-title">搜索 艺人{' \' '+key+' \' ' }</div>
            <div className="new-album-playlist">
                <Row gutter={[44, 24]}>
                    {artistList.map((item: IArtist, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.picUrl}
                                    title={item.name}
                                    type="artist"
                                    id={item.id}
                                    shape="circle"
                                    textPostion="center"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default ArtistSearch;
