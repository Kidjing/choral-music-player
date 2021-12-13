import ReactDOM from 'react-dom';
import Routes from 'src/router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
