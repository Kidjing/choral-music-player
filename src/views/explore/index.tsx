import { FmCard,DynamicTag } from 'src/components';

import './index.less';

const Explore = () => {
    return (
        <div className="home">
            <DynamicTag />
            <FmCard
                style={{ width: '220px' }}
                imgSrc="https://p1.music.126.net/11NBW2T83KnHLZ89eXLXbw==/109951165663271282.jpg?param=512y512"
                title="网易云"
                shape="circle"
                textPostion="center"
            />
        </div>
    );
};

export default Explore;
