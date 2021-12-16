import ArtistSearch from './artistSearch';
import { Grid } from '@arco-design/web-react';

const Row = Grid.Row;
const Col = Grid.Col;


const Search = () => {
    return (
        <div>
            <Row gutter={[20, 24]}>
                <Col span={12}>
                    <ArtistSearch />
                </Col>
            </Row>
        </div>
    )
}
export default Search;