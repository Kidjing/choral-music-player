import React from 'react';
import { Layout } from '@arco-design/web-react';
import './index.less';

const Content = Layout.Content;

const Body: React.FC=({children})=>{
    return(
        <Content className="layout-body">
            {children}
        </Content>
    )
}

export default Body;