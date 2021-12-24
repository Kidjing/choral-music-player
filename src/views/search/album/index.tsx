
import { Grid } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { CommonCard } from "src/components";
import { useSearchParams } from 'react-router-dom';
import { search } from 'src/api/search';
import { IAlbum } from "src/api/types/album";


const Row = Grid.Row;
const Col = Grid.Col;

const AlbumSearch = () => {
    let [albumList, setAlbumList] = useState<IAlbum[]>([]);

    const [searchParams] = useSearchParams();
    const key = searchParams.get('keyword')!;

    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 10, limit: 30 }).then(res => {
            setAlbumList(res.albums!);
        })
    }, [searchParams])
    return (
        <div>
            <div className="search-title">搜索 专辑{' \' '+key+' \' ' }</div>
            <div className="new-album-playlist">
                <Row gutter={[44, 24]}>
                    {albumList.map((item: IAlbum, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.picUrl}
                                    title={item.name}
                                    type="album"
                                    desc={item.artist.name}
                                    id={item.id}
                                    shape="round"
                                    textPostion="left"
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default AlbumSearch;
