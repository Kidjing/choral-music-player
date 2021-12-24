import { Effect, put, call, SagaReturnType } from 'redux-saga/effects';
import { getPersonalFM } from 'src/api/songlist';
import { pushFm } from './reducer';

type getFmPlayList = SagaReturnType<typeof getPersonalFM>;

export function* loadFmPlayList(action: Effect) {
    const { status } = action.payload;
    try {
        if (status) {
            const result: getFmPlayList = yield call(getPersonalFM);
            yield put(pushFm(result));
        } else {
            const result: getFmPlayList = yield call(getPersonalFM);
            yield put(pushFm(result));
        }
    } catch (e) {
        yield put({ type: 'SET_INFO', message: e.message });
    }
}
