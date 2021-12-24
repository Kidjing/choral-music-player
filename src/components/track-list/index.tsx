import { Grid } from '@arco-design/web-react';
import { IMusic, IArtistItem } from '../../api/types/song';
import { useNavigate} from 'react-router-dom';

import './index.less';
import classNames from 'classnames';

interface TrackProps {
    album: IMusic;
    hoverable?:boolean;
}

interface TrackListProps {
    playlist: IMusic[];
}

const Row = Grid.Row;
const Col = Grid.Col;

export const Track = (props: TrackProps) => {
    const { album , hoverable=true} = props;
    const navigate = useNavigate()
    return (
        <div className={classNames("track", hoverable?'hover':'')}>
            <img src={album.al.picUrl} loading='lazy' onClick={()=>{navigate('/album?id='+album.al.id)}} />
            <div className="title-and-artist">
                <div className="title" onClick={()=>{navigate('/song?id='+album.id)}}>{album.name}</div>
                <div className="artist">
                    {album.ar.map((item: IArtistItem, index: number) => {
                        if (index === album.ar.length - 1) {
                            return <a onClick={()=>{navigate('/artist?id='+item.id)}}>{item.name} </a>;
                        } else {
                            return <a onClick={()=>{navigate('/artist?id='+item.id)}}>{item.name},</a>;
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
                        <Col key={index} span={6}>
                            <Track album={item} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default TrackList;
