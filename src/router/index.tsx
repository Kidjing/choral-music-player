import React from 'react';
import {  useRoutes } from 'react-router-dom';
import { Layout } from 'src/components';
import Alubum from 'src/views/album';
import Artist from 'src/views/artist';
import Explore from 'src/views/explore';
import Home from 'src/views/home';
import Library from 'src/views/library';
import Playlist from 'src/views/playlist';
import Song from 'src/views/song';
import Search from 'src/views/search';

const RouteConfig = () => {
    let routes = useRoutes([
        {
            path: '/',
            index: true,
            element: <Home />,
        },
        { path: '/explore', element: <Explore /> },
        { path: '/library', element: <Library /> },
        { path: '/playlist', element: <Playlist /> },
        { path: '/song', element: <Song /> },
        { path: '/album', element: <Alubum /> },
        { path: '/artist', element: <Artist /> },
        { path: '/search', element: <Search /> }
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
