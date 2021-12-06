import React from 'react';

import Header from './header';
import Footer from './footer';

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="layout-body">
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
