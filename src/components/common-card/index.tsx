import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { playMusic } from 'src/store/playing/reducer';
import { connect } from 'react-redux';

interface CommonCardProps {
    imgSrc: string;
    shape?: 'circle' | 'round';
    textPostion?: 'left' | 'center' | 'right';
    title?: string | React.ReactNode;
    titleUrl?: string;
    desc?: string | React.ReactNode;
    style?: React.CSSProperties;
    className?: string | string[];
    id?:number;
    type?:string;
}

const CommonCard = (props: any) => {
    const navigate = useNavigate();
    const { imgSrc, style, title, desc, shape = 'round', textPostion, id ,type} = props.ownProps;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const goToAlbum=(id:number,type:string)=>{
        if(id===0) return;
        navigate('/'+type+'?id='+id);
    }

    return (
        <div style={style} className="common-card">
            <div
                className="common-card-cover"
                onMouseOver={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                <Button
                    onClick={() => {props.playMusic(id,type)}}
                    className={classNames('play-button', isVisible ? '' : 'none')}
                    size="large"
                    shape="round"
                    icon={<IconCaretRight style={{ width: '80%', height: '80%' }} />}
                />
                <img
                    className="common-card-cover-img"
                    loading='lazy'
                    style={{ borderRadius: shape === 'round' ? '0.75em' : '50%' }}
                    src={imgSrc+'?param=300y300'}
                    onClick={()=>goToAlbum(id as number,type as string)}
                />
            </div>
            <div
                className="common-card-text"
                style={{ justifyContent: textPostion}}
            >
                <div className="common-card-text-title" style={{width:textPostion==='left'?'100%':''}}>
                    <a href={'/'+type+'?id='+id}>{title}</a>
                </div>
                <div className="common-card-text-info">
                    <span>{desc}</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any,ownProps:CommonCardProps) => {
    return {
        song: state.currentMusicReducer,
        ownProps:ownProps
    };
};

const mapDispatchToProps = {
    playMusic,
};
export default connect(mapStateToProps, mapDispatchToProps)(CommonCard);

