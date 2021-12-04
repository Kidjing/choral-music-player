import ReactDOM from 'react-dom';
import { FmCard, PlayList, DynamicTag } from 'src/components';

const data = [
    {
        name: 'Ride It',
        id: 1379945341,
        ar: [
            {
                id: 12260125,
                name: 'Regard',
            },
        ],
        al: {
            id: 80594567,
            name: 'Ride It',
            picUrl: 'https://p2.music.126.net/_FEXx8L4oNvuBsiKUdxbQw==/109951165986861088.jpg',
            pic_str: '109951165986861088',
            pic: 109951165986861090,
        },
        dt: 157648,
        publishTime: 1564070400000,
    },
];

const App = () => {
    return (
        <div>
            Welcome to the choral music!
            {/* <FmCard
                style={{ width: '290px' }}
                imgSrc="https://p1.music.126.net/gCxvN2bzA2IxdLO98lqAbw==/109951166277134169.jpg?param=512y512"
                title="网易云最受欢迎的歌单"
                desc={<a href="">热门推荐</a>}
            /> */}
            <FmCard
                style={{ width: '220px' }}
                imgSrc="https://p1.music.126.net/11NBW2T83KnHLZ89eXLXbw==/109951165663271282.jpg?param=512y512"
                title="网易云"
                shape="circle"
                textPostion="center"
            />
            <PlayList className="playlist" data={data} />
            <DynamicTag />
        </div>
            
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
