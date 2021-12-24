
import { Grid } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { CommonCard } from "src/components";
import { useSearchParams } from 'react-router-dom';
import { search } from 'src/api/search';
import { ISonglist } from "src/api/types/songlist";


const Row = Grid.Row;
const Col = Grid.Col;

const PlaylistSearch = () => {
    let [artistList, setArtistList] = useState<ISonglist[]>([]);

    const [searchParams] = useSearchParams();
    const key = searchParams.get('keyword')!;

    useEffect(() => {
        const key = searchParams.get('keyword')!;
        search({ key, type: 1000, limit: 30 }).then(res => {
            setArtistList(res.playlists!);
        })
    }, [searchParams])
    return (
        <div>
            <div className="search-title">搜索 歌单{' \' '+key+' \' ' }</div>
            <div className="new-album-playlist">
                <Row gutter={[44, 24]}>
                    {artistList.map((item: ISonglist, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={item.coverImgUrl}
                                    title={item.name}
                                    type="playlist"
                                    id={item.id}
                                    shape="circle"
                                    textPostion="left"
                                    desc={item.description}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default PlaylistSearch;
