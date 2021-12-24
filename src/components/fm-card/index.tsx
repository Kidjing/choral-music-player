import { Button } from '@arco-design/web-react';
import { usePalette } from 'color-thief-react';
import { IArtistItem, IFmMusic } from '../../api/types/song';
import { IconThumbDown, IconPlayArrow, IconPause, IconSkipNext } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getFm } from 'src/store/fm-card/reducer';
import { trashPersonalFM } from 'src/api/songlist';

import './index.less';

const FmCard = (props: any) => {
    const [play, setPlay] = useState(false);
    const [currentFm, setCurrentFm] = useState<IFmMusic>(props.personalFm.shift());
    const { data } = usePalette(currentFm.album.picUrl, 2, 'hex', { crossOrigin: 'anonymous' });

    const getNext = () => {
        setCurrentFm(props.personalFm.shift());
        props.getFm(props.userInfo);
    };
    const trashFm = (id: number) => {
        trashPersonalFM(id)
            .then((res) => {
                if (res) {
                    console.log(res);
                }
            })
            .catch();
    };

    return (
        <div className="fm-card" style={{ background: `linear-gradient(to top left, ${data?.[0]}, ${data?.[1]})` }}>
            <img className="fm-card-cover" loading='lazy' src={currentFm.album.picUrl} />
            <div className="fm-card-right">
                <div className="info">
                    <div className="title">{currentFm.name}</div>
                    <div className="artist">
                        {currentFm.artists.map((item: IArtistItem, index: number) => {
                            if (index === currentFm.artists.length - 1) {
                                return <a href={'/?artist=' + item.id}>{item.name} </a>;
                            } else {
                                return <a href={'/?artist=' + item.id}>{item.name},</a>;
                            }
                        })}
                    </div>
                </div>
                <div className="control">
                    <div className='buttons'>
                        <Button
                            className="btn"
                            onClick={() => trashFm(currentFm.id)}
                            icon={<IconThumbDown style={{ width: '100%', height: '100%' }} />}
                        />
                        <Button
                            className="btn"
                            onClick={() => {
                                setPlay(!play);
                            }}
                        >
                            {play ? (
                                <IconPause style={{ width: '100%', height: '100%' }} />
                            ) : (
                                <IconPlayArrow style={{ width: '100%', height: '100%' }} />
                            )}
                        </Button>
                        <Button
                            className="btn"
                            onClick={getNext}
                            icon={<IconSkipNext style={{ width: '100%', height: '100%' }} />}
                        />
                    </div>
                    <div className="card-name">私人FM</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
        personalFm: state.personalFmReducer,
    };
};

const mapDispatchToProps = {
    getFm,
};

export default connect(mapStateToProps, mapDispatchToProps)(FmCard);