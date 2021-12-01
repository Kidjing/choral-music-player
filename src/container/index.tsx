import ReactDOM from 'react-dom';
import FmCard from 'src/components/fm-card';

const App = () => {
    return (
        <div>
            Welcome to the choral music!
            <FmCard
                imgSrc="https://p1.music.126.net/gCxvN2bzA2IxdLO98lqAbw==/109951166277134169.jpg?param=512y512"
                title="网易云最受欢迎的歌单"
                desc={
                    <a href="">
                        热门推荐
                    </a>
                }
            />
            <FmCard
                style={{width: "120px"}}
                imgSrc="https://p1.music.126.net/11NBW2T83KnHLZ89eXLXbw==/109951165663271282.jpg?param=512y512"
                title="网易云"
                shape="circle"
                textPostion="center"
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
