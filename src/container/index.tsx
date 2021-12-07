import ReactDOM from 'react-dom';
import Routes from 'src/router';
import { BrowserRouter as Router } from 'react-router-dom';


const App = () => {
    return (
        <div>
            <Router>
                <Routes/>
            </Router>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
