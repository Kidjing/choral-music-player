import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Layout } from 'src/components';
import Album from 'src/views/album';
import Artist from 'src/views/artist';
import Explore from 'src/views/explore';
import Home from 'src/views/home';
import Library from 'src/views/library';
import Playlist from 'src/views/playlist';
import Song from 'src/views/song';
import Search from 'src/views/search';
// 详情搜索
import ArtistSearch from 'src/views/search/artist';
import AlbumSearch from 'src/views/search/album';
import PlaylistSearch from 'src/views/search/playlist';
import SongSearch from 'src/views/search/song';

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
        { path: '/new/album', element: <NewAlbum /> },
        { path: '/artist', element: <Artist /> },
        {
            path: '/search', children: [
                {
                    index: true, element: <Search />
                },
                {
                    path: 'artist', element: <ArtistSearch />
                },
                {
                    path: 'album', element: <AlbumSearch />
                },
                {
                    path: 'playlist', element: <PlaylistSearch />
                },
                {
                    path: 'song', element: <SongSearch />
                }
            ]
        },
        { path: '/login/qr', element: <QrLogin /> },
        { path: '/login/password', element: <PasswordLogin /> },
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