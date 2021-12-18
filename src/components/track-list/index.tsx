import { Grid } from '@arco-design/web-react';
import { IMusic, IArtistItem } from '../../api/types/song';

import './index.less';

interface TrackProps {
    album: IMusic;
}

interface TrackListProps {
    playlist: IMusic[];
}

const Row = Grid.Row;
const Col = Grid.Col;

const Track = (props: TrackProps) => {
    const { album } = props;
    return (
        <div className="track">
            <img src={album.al.picUrl} />
            <div className="title-and-artist">
                <div className="title">{album.name}</div>
                <div className="artist">
                    {album.ar.map((item: IArtistItem, index: number) => {
                        if (index === album.ar.length - 1) {
                            return <a href={'/artist/' + item.id}>{item.name} </a>;
                        } else {
                            return <a href={'/artist/' + item.id}>{item.name},</a>;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

const TrackList = (props: TrackListProps) => {
    const {playlist}=props;
    return (
        <div className="track-list">
            <Row gutter={[4, 4]}>
                {playlist.map((item, index) => {
                    return (
                        <Col key={index} span={8}>
                            <Track album={item} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default TrackList;
