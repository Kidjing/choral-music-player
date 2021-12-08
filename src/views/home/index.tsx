import { MusicTable, TextModal } from 'src/components';
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
    }
];


const Home = () => {
    return (
        <div className="home">
            <TextModal
                desc=" 这里有一本奇妙的记事簿，名为“恋恋”。“恋”字拆开是亦心，即亦如初心，一如既往"
                title="专辑介绍"
            />
            <MusicTable type="album" data={data} />
            <APITest />
        </div>
    );
};

export default Home;
