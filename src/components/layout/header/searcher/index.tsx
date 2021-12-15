import { Input, Trigger, List, Typography } from '@arco-design/web-react';
import { IconSearch, IconUser, IconMusic, IconFileAudio, IconRecord } from '@arco-design/web-react/icon';
import React from 'react';
import { suggestSearch } from '../../../../api/search'
import { ISuggestSearch } from '../../../../api/types/search'
import './index.less';


const Searcher = () => {

    const [input, setInput] = React.useState('')
    const [search, setSearch] = React.useState<ISuggestSearch>()
    const inputChange = (inputValue: string) => {
        setInput(inputValue)
        suggestSearch(inputValue).then(res => {
            console.log(res);
            console.log(input);

            setSearch(res)
            console.log(search);

        })
    }

    const pop = () => {
        return (<div className='demo-trigger-popup'>
            <List size='small'
                header={
                    <div className="searcher-list-header">
                        <IconUser />
                        <Typography.Text type='primary'>
                            {` 艺人`}
                        </Typography.Text>
                    </div>}
                dataSource={search?.artists}
                render={(item, index) => <List.Item key={index}>{item.name}</List.Item>} />
            <List size='small'
                header={
                    <div className="searcher-list-header">
                        <IconMusic />
                        <Typography.Text type='primary'>
                            {` 单曲`}
                        </Typography.Text>
                    </div>}
                dataSource={search?.songs}
                render={(item, index) => <List.Item key={index}>{item.name + '——' + item.artists[0].name}</List.Item>} />
            <List size='small'
                header={
                    <div className="searcher-list-header">
                        <IconFileAudio />
                        <Typography.Text type='primary'>
                            {` 歌单`}
                        </Typography.Text>
                    </div>}
                dataSource={search?.playlists}
                render={(item, index) => <List.Item key={index}>{item.name}</List.Item>} />
            <List size='small'
                header={
                    <div className="searcher-list-header">
                        <IconRecord />
                        <Typography.Text type='primary' >
                            {` 唱片`}
                        </Typography.Text>
                    </div>}
                dataSource={search?.albums}
                render={(item, index) => <List.Item key={index}>{item.name + '——' + item.artist.name}</List.Item>} />
        </div>)
    }
    return (
        <Trigger popup={pop} position='bottom' trigger='click'>
            <Input className="searcher" prefix={<IconSearch />}
                allowClear placeholder="搜索" onChange={inputChange} />
        </Trigger>
    );
};

export default Searcher;
