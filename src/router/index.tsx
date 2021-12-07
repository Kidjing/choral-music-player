import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import Explore from 'src/views/explore';
import Home from 'src/views/home';
import Library from 'src/views/library';

const RouteConfig = () => {
    let routes = useRoutes([
        {
            path: '/',
            index: true,
            element: <Home />,
        },
        { path: '/explore', element: <Explore /> },
        { path: '/library', element: <Library /> },
    ]);
    return routes;
};

const Routes = () => {
    return (
        <Router>
            <RouteConfig />
        </Router>
    );
};

export default Routes;
