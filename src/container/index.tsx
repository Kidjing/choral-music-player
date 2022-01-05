import ReactDOM from 'react-dom';
import Routes from 'src/router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from 'src/store';
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
    
    // const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    // darkThemeMq.addEventListener('change', (e) => {
    //     if (e.matches) {
    //         document.body.setAttribute('arco-theme', 'dark');
    //     } else {
    //         document.body.removeAttribute('arco-theme');
    //     }
    // });
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Routes />
                </Router>
            </PersistGate>

        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
