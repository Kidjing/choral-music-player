import { Grid } from '@arco-design/web-react';
import { CommonCard, DynamicTag } from 'src/components';

import './index.less';

const Row = Grid.Row;
const Col = Grid.Col;
const data = [1, 1, 1, 1, 1, 1];

const Explore = () => {
    return (
        <div className="explore">
            <h1>发现</h1>
            <div className="explore-tags">
                <DynamicTag />
            </div>
            <div className="explore-playlist">
                <Row gutter={[44, 24]}>
                    {data.map((item, index) => {
                        return (
                            <Col key={index} span={4}>
                                <CommonCard
                                    imgSrc="https://p1.music.126.net/ushHeJuVgLag0oUONbUJxg==/109951166709761190.jpg?param=512y512"
                                    title="网易云"
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

export default Explore;
