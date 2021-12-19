import ReactDOM from 'react-dom';
import Routes from 'src/router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';

const App = () => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(darkThemeMq)
    darkThemeMq.addEventListener('change', (e) => {
        console.log(e.matches)
        if (e.matches) {
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            document.body.removeAttribute('arco-theme');
        }
    });
    return (
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
