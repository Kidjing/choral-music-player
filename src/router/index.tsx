import React from 'react';
import {  useRoutes } from 'react-router-dom';
import { Layout } from 'src/components';
import Album from 'src/views/album';
import Artist from 'src/views/artist';
import Explore from 'src/views/explore';
import Home from 'src/views/home';
import Library from 'src/views/library';
import Playlist from 'src/views/playlist';
import Song from 'src/views/song';
import Search from 'src/views/search';
import QrLogin from 'src/views/login/qr';
import PasswordLogin from 'src/views/login/password';
import Daily from 'src/views/daily';
import NewAlbum from 'src/views/new-album';
import UserSongs from 'src/views/library/songs';

const RouteConfig = () => {
    let routes = useRoutes([
        {
            path: '/',
            index: true,
            element: <Home />,
        },
        { path: '/explore', element: <Explore /> },
        {
            path: '/library', children: [
                {
                    index: true, element: <Library />
                },
                {
                    path: 'songs', element: <UserSongs />
                }
            ]
        },
        { path: '/playlist', element: <Playlist /> },
        { path: '/song', element: <Song /> },
        { path: '/album', element: <Album /> },
        { path: '/new-album', element: <NewAlbum /> },
        { path: '/artist', element: <Artist /> },
        { path: '/search', element: <Search /> },
        { path: '/login_qr', element: <QrLogin /> },
        { path: '/login_password', element: <PasswordLogin /> },
        { path: '/daily/songs', element: <Daily /> },
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