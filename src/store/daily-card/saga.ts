import { Effect, put, call, SagaReturnType } from 'redux-saga/effects';
import { getDailyPlaylist } from 'src/api/songlist';
import { getSongs } from './reducer';

type getDailySongList = SagaReturnType<typeof getDailyPlaylist>;

export function* loadDailyPlayList(action: Effect) {
    const { status } = action.payload;
    try {
        if (status) {
            const result: getDailySongList = yield call(getDailyPlaylist);
            yield put(getSongs(result));
        }
    } catch (e) {
        yield put({ type: 'SET_INFO', message: e.message });
    }
}
