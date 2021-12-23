import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getDailyPlaylist } from 'src/api/songlist';
import { IMusic } from 'src/api/types/song';
import { MusicTable } from 'src/components';

import './index.less';

const Daily = () => {
    const [dailyList, setDailyList] = useState<IMusic[]>([]);
    useEffect(() => {
        getDailyPlaylist().then((res) => {
            setDailyList(res);
        });
    }, []);
    return (
        <div className="daily">
            <div className='special-playlist'>
                <div className={classNames("title",'gradient')}>每日歌曲推荐</div>
                <div className="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
            </div>

            <MusicTable type="playlist" data={dailyList} />
        </div>
    );
};

export default Daily;
