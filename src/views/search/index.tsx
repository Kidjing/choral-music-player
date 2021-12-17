import ArtistSearch from './artistSearch';
import AlbumSearch from './albumSearch';
import SongSearch from './songSearch';

import { Grid } from '@arco-design/web-react';

const Row = Grid.Row;
const Col = Grid.Col;


const Search = () => {
    return (
        <div>
            <Row gutter={[60, 24]}>
                <Col span={12}>
                    <ArtistSearch />
                </Col>
                <Col span={12}>
                    <AlbumSearch />
                </Col>
            </Row>
            <SongSearch/>
        </div>
    )
}
export default Search;