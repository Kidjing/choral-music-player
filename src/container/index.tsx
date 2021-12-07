import ReactDOM from 'react-dom';
import { Layout } from 'src/components';
import Routes from 'src/router';

const App = () => {
    return (
        <div>
            <Layout>
                <Routes/>
            </Layout>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
