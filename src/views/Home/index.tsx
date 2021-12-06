import { FmCard, MusicTable, DynamicTag } from 'src/components';
import APITest from 'src/components/api-test';
import './index.less';

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
    {
        name: 'Ride It',
        id: 1379945342,
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
    {
        name: 'Ride It',
        id: 1379945343,
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

const Home = () => {
    return (
        <div className="home">
            <FmCard
                style={{ width: '290px' }}
                imgSrc="https://p1.music.126.net/gCxvN2bzA2IxdLO98lqAbw==/109951166277134169.jpg?param=512y512"
                title="网易云最受欢迎的歌单"
                desc={<a href="">热门推荐</a>}
            />
            <FmCard
                style={{ width: '220px' }}
                imgSrc="https://p1.music.126.net/11NBW2T83KnHLZ89eXLXbw==/109951165663271282.jpg?param=512y512"
                title="网易云"
                shape="circle"
                textPostion="center"
            />
            <MusicTable type="songlist" className="playlist" data={data} />
            <DynamicTag />
            <APITest />
        </div>
    );
};

export default Home;
