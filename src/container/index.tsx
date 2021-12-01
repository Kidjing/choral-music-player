import ReactDOM from 'react-dom';
import FmCard from 'src/components/fm-card';

const App = () => {
    return (
        <div>
            Welcome to the choral music!
            <FmCard
                imgSrc="https://p1.music.126.net/lHjRKW5bkXO4ZXy5ShoDFA==/109951165517309896.jpg?param=512y512"
                title="网易云那些评论过万的歌"
                desc={
                    <a href="">
                        热门推荐
                    </a>
                }
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
