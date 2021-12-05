import { Button } from '@arco-design/web-react';
import { getAlbum } from '../../api/album'

const testAlbum = () => {
    getAlbum(44444).then(res => {
        console.log(res);
    })
}

const APITest = () => {
    return (
        <div>
            <Button onClick={testAlbum} type='primary'>测试专辑</Button>
        </div>
    );
};

export default APITest;
