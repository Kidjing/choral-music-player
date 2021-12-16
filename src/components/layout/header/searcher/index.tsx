import { Input, Trigger, List, Typography, Button, Space, Message } from '@arco-design/web-react';
import { IconSearch, IconUser, IconMusic, IconFileAudio, IconRecord, IconList, IconDelete } from '@arco-design/web-react/icon';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { suggestSearch } from 'src/api/search'
import { ISuggestSearch } from 'src/api/types/search'
import { addRecord, clearRecord } from 'src/store/search-record/reducer'
import { connect } from 'react-redux';
import './index.less';


const Searcher = (props: any) => {
    const navigate = useNavigate();
    const [input, setInput] = React.useState('')
    const [show, setShow] = React.useState(0)
    const [search, setSearch] = React.useState<ISuggestSearch>()
    const inputChange = (inputValue: string) => {
        setShow(inputValue === '' ? 0 : 1)
        setInput(inputValue)
        suggestSearch(inputValue).then(res => {
            console.log(input);
            setSearch(res)
        })
    }
    const addRecord = (input: string) => {
        if (/^[\u4E00-\u9FA5\uFE30-\uFFA0]+$/.test(input))
            props.addRecord(input)
    }

    const clickSearchRecord = (item: string) => {
        inputChange(item)
    }
    
    const clickClearRecord = () => {
        props.clearRecord()
        Message.success("成功删除搜索记录")
    }

    const pop = () => {
        return (
            <div className='demo-trigger-popup'>
                {show ? <div>
                    {search?.artists !== undefined && <List size='small'
                        header={
                            <div className="searcher-list-header">
                                <IconUser />
                                <Typography.Text type='primary'>
                                    {` 艺人`}
                                </Typography.Text>
                            </div>}
                        dataSource={search?.artists}
                        render={(item, index) =>
                            <List.Item onClick={() => { navigate('/artist/?id=' + item.id); addRecord(input) }}
                                className='searcher-list-item' key={index}>
                                {item.name}</List.Item>} />}
                    {search?.songs !== undefined && <List size='small'
                        header={
                            <div className="searcher-list-header">
                                <IconMusic />
                                <Typography.Text type='primary'>
                                    {` 单曲`}
                                </Typography.Text>
                            </div>}
                        dataSource={search?.songs}
                        render={(item, index) =>
                            <List.Item onClick={() => { navigate('/song/?id=' + item.id); addRecord(input) }}
                                className='searcher-list-item' key={index}>
                                {item.name + '——' + item.artists[0].name}</List.Item>} />}
                    {search?.playlists !== undefined && <List size='small'
                        header={
                            <div className="searcher-list-header">
                                <IconFileAudio />
                                <Typography.Text type='primary'>
                                    {` 歌单`}
                                </Typography.Text>
                            </div>}
                        dataSource={search?.playlists}
                        render={(item, index) => <List.Item onClick={() => { navigate('/playlist/?id=' + item.id); addRecord(input) }} className='searcher-list-item' key={index}>
                            {item.name}
                        </List.Item>} />}
                    {search?.albums !== undefined && <List size='small'
                        header={
                            <div className="searcher-list-header">
                                <IconRecord />
                                <Typography.Text type='primary' >
                                    {` 唱片`}
                                </Typography.Text>
                            </div>}
                        dataSource={search?.albums}
                        render={(item, index) =>
                            <List.Item onClick={() => { navigate('/album/?id=' + item.id); addRecord(input) }}
                                className='searcher-list-item' key={index}>
                                {item.name + '——' + item.artist.name}</List.Item>} />}
                </div> : null}
                {show ? null :
                    <List size='small'
                        header={
                            <div className="searcher-list-header">
                                <Space align='center'>
                                    <IconList />
                                    <Typography.Text type='primary' >
                                        {` 搜索记录`}
                                    </Typography.Text>
                                    {props.records.length === 0 ? null : <Button onClick={() => clickClearRecord()} type='text' icon={<IconDelete />} style={{ marginLeft: "54px" }} />}
                                </Space>
                            </div>}
                        dataSource={props.records}
                        render={(item, index) => <List.Item onClick={() => clickSearchRecord(item)} className='searcher-list-item' key={index}>{item}</List.Item>} />
                }
            </div>
        )
    }
    return (
        <Trigger popup={pop} position='bottom' trigger={['click']} clickToClose={false}>
            <Input size='large' className="searcher" prefix={<IconSearch />}
                allowClear placeholder="搜索" onPressEnter={()=>{navigate('/search/?keyword='+input)}}
                onChange={inputChange} value={input} />
        </Trigger>
    );
};

const mapStateToProps = (state: any) => {
    return {
        records: state.searchRecordReducer,
    };
};

const mapDispatchToProps = { clearRecord, addRecord };


export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
