import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import Explore from 'src/views/explore';
import Home from 'src/views/home';

const RouteConfig = () => {
    let routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/explore', element: <Explore /> },
    ]);
    return routes;
};

const Routes = () => {
    return (
        <Router>
            <RouteConfig />
            {/* <Route path='/explore' element={<Explore />} /> */}
        </Router>
    );
};

export default Routes;
