import React from 'react';

import Header from './header';
import Footer from './footer';

import './index.less';

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="layout-content">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
