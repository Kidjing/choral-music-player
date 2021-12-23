import { Button } from '@arco-design/web-react';
import { IArtistItem, IMusic } from '../../api/types/song';
import { IconThumbDown, IconPlayArrow, IconPause, IconSkipNext } from '@arco-design/web-react/icon';
import './index.less';
import { useEffect, useState } from 'react';
import { getPersonalFM } from 'src/api/songlist';
import { connect } from 'react-redux';

const FmCard = (props: any) => {
    const [play, setPlay] = useState(false);
    const [personalFM, setPersonalFM] = useState<IMusic[]>([]);
    const defaultFM = {
        imgSrc: 'https://p4.music.126.net/5AQU0WlqeDsA5XSDVaXTqA==/4420036743669830.jpg?param=512y512',
        title: 'MOM',
        artists: [
            {
                id: 12260125,
                name: 'Regard',
            },
        ],
    };

    useEffect(() => {
        if (props.userInfo.status) {
            getPersonalFM().then((res) => {
                setPersonalFM(res);
            });
        }
    }, [props.userInfo.status]);

    return (
        <div
            className="fm-card"
            style={{ background: 'linear-gradient(to left top, rgb(119, 127, 103), rgb(173, 169, 154))' }}
        >
            <img className="fm-card-cover" src={personalFM[0] ? personalFM[0].al.picUrl : defaultFM.imgSrc} />
            <div className="fm-card-right">
                <div className="info">
                    <div className="title">{personalFM[0] ? personalFM[0].name : defaultFM.title}</div>
                    <div className="artist">
                        {(personalFM[0] ? personalFM[0].ar : defaultFM.artists).map(
                            (item: IArtistItem, index: number) => {
                                if (index === (personalFM[0] ? personalFM[0].ar : defaultFM.artists).length - 1) {
                                    return <a>{item.name} </a>;
                                } else {
                                    return <a>{item.name},</a>;
                                }
                            },
                        )}
                    </div>
                </div>
                <div className="control">
                    <Button className="btn" icon={<IconThumbDown style={{ width: '100%', height: '100%' }} />} />
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
                    <Button className="btn" icon={<IconSkipNext style={{ width: '100%', height: '100%' }} />} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfoReducer,
    };
};

export default connect(mapStateToProps)(FmCard);
