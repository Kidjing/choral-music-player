import ReactDOM from 'react-dom';
import { Layout } from 'src/components';
import Home from 'src/views/home';

const App = () => {
    return (
        <div>
            <Layout>
                <Home/>
            </Layout>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
