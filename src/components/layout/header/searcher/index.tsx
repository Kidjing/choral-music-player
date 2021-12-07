import { Input } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';

import './index.less';


const Searcher = () => {
    return (
        <div className="searcher">
            <Input prefix={<IconSearch />} allowClear placeholder="搜索"/>
        </div>
    );
};

export default Searcher;
