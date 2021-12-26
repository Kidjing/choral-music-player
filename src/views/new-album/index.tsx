
import { Grid } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { getNewAlbum } from "src/api/album";
import { IAlbum } from "src/api/types/album";
import { CommonCard } from "src/components";

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

const NewAlbum = () => {
    const [albumList, setAlbumList] = useState<IAlbum[]>([]);

    useEffect(() => {
        getNewAlbum(120, 0, 'EA').then((res) => {
            setAlbumList(res);
        });
    }, []);
    return (
        <div className="new-album">
            <h1>新专速递</h1>
            <div className="new-album-playlist">
                <Row gutter={[44, 24]}>
                    {albumList.map((album: IAlbum, index: number) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc={album.picUrl}
                                    title={album.name}
                                    desc={<a href={'/artist?id=' + album.artist.id}>{album.artist.name} </a>}
                                    type="album"
                                    id={album.id}
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

export default NewAlbum;
