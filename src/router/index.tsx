import React from 'react';
import {  useRoutes } from 'react-router-dom';
import { Layout } from 'src/components';
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
        <Layout>
            <RouteConfig />
        </Layout>
    );
};

export default Routes;
