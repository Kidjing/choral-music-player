import React from 'react';
import Header from './header';
import Footer from './footer';
import Body from './body';

import './index.less';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <Body>{children}</Body>
            <Footer />
        </div>
    );
};

export default Layout;
