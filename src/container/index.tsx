import ReactDOM from 'react-dom';
import { Button, Space } from '@arco-design/web-react';

const App = () => {
    return (
        <div>
            Welcome to the choral music!
            <Space size="large">
                <Button type="primary">Primary</Button>
                <Button type="secondary">Secondary</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="outline">Outline</Button>
                <Button type="text">Text</Button>
            </Space>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
