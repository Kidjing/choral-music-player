import ReactDOM from 'react-dom';
import {FmCard, PlayList } from 'src/components';

const data = [
    {
        id: 1,
        name: 'For Jenni',
        artists: [{
            albumSize: 345,
            id: 1,
            img1v1Id: 34,
            img1v1Url: "https://p4.music.126.net/WFNnQjdVR6ihsBYRcoyYrQ==/109951166629187074.jpg?param=224y224",
            musicSize: 3462,
            name: '周杰伦',
            picId: 1,
            picUrl: "https://p4.music.126.net/WFNnQjdVR6ihsBYRcoyYrQ==/109951166629187074.jpg?param=224y224",
            topicPerson: 555,
        }],
        duration:180,
        album: {id:1,name:'路上',picUrl:'https://p4.music.126.net/WFNnQjdVR6ihsBYRcoyYrQ==/109951166629187074.jpg?param=224y224'},
        time: '3:14',
    }
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
            {/* <PlayList data={data}/> */}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
