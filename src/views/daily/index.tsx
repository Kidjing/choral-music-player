import classNames from 'classnames';
import { connect } from 'react-redux';
import { MusicTable } from 'src/components';

import './index.less';

const Daily = (props:any) => {
    return (
        <div className="daily">
            <div className='special-playlist'>
                <div className={classNames("title",'gradient')}>每日歌曲推荐</div>
                <div className="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
            </div>
            <MusicTable type="playlist" data={props.dailyPlayList} />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        dailyPlayList:state.dailySongsReducer,
    };
};

export default connect(mapStateToProps)(Daily);
