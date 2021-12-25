import { Comment, Button, Input, Alert } from '@arco-design/web-react';
import { IconMessage, IconThumbUp } from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import { IComment } from '../../api/types/comment';
import { ICreator } from '../../api/types/user';
import { dateTrans } from '../../utils/timetrans';

import './index.less';

interface CommentItemProps {
    comment: IComment;
    creator: ICreator;
    status:boolean;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment, creator, status } = props;
    const { user, content, time, likedCount, liked } = comment;
    const [like, setLike] = useState<boolean>(liked);
    const [reply, setReply] = useState<boolean>(false);
    const [alert, setAlert] = React.useState<boolean>(false);

    const actions = [
        <span className="comment-action" key="like" onClick={() =>{
            if(status){
                setLike(!like);
            }else{
                setAlert(true);
            }
        }}>
            {like ? <IconThumbUp style={{ color: '#f53f3f' }} /> : <IconThumbUp />}{' '}
            {!!likedCount && <span>{likedCount + (like?1:0)}</span>}
        </span>,
        <span
            className="comment-action"
            key="reply"
            onClick={() => {
                setReply(!reply);
            }}
        >
            <IconMessage />
        </span>,
    ];

    return (
        <Comment
            align="right"
            actions={actions}
            author={user.nickname}
            avatar={user.avatarUrl}
            content={<div>{content}</div>}
            datetime={dateTrans(time)}
        >
            {alert?(
                <Alert className='alert' closable type='warning' title='请先登录' content='需要登录才能使用该功能' onClose={()=>{setAlert(false)}} />
            ):(
                null
            )}
            {reply && (
                <Comment
                    align="right"
                    actions={[
                        <Button key="0" type="secondary">
                            取消
                        </Button>,
                        <Button key="1" type="primary" onClick={()=>{
                            if(status === false){
                                setAlert(true);
                            }
                        }}>
                            评论
                        </Button>,
                    ]}
                    author={creator.nickname}
                    avatar={creator.avatarUrl}
                    content={
                        <div>
                            <Input.TextArea defaultValue={'回复_' + user.nickname + ':'} />
                        </div>
                    }
                />
            )}
        </Comment>
    );
};

interface Comment{
    commentList: IComment[];
    creator: ICreator;
    status:boolean
}

const Comments = (props: Comment) => {
    const { commentList, creator, status } = props;
    const [alert, setAlert] = React.useState<boolean>(false);
    return (
        <div className="comments">
            {alert?(
                <Alert className='alert' closable type='warning' title='请先登录' content='需要登录才能使用该功能' onClose={()=>{setAlert(false)}} />
            ):(
                null
            )}
            <div className="comments-top">
                <Comment
                    align="right"
                    actions={[
                        <Button key="0" type="secondary">
                            取消
                        </Button>,
                        <Button key="1" type="primary" onClick={()=>{
                            if(status === false){
                                setAlert(true);
                            }
                        }}>
                            评论
                        </Button>,
                    ]}
                    avatar={creator.avatarUrl}
                    content={
                        <div>
                            <Input.TextArea placeholder="评论" />
                        </div>
                    }
                />
            </div>
            <div className="comments-list">
                <h3>精彩评论</h3>
                {commentList.map((comment: IComment, index: number) => {
                    return (
                        <div className="comments-list-item" key={index}>
                            <CommentItem comment={comment} creator={creator} status={status} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Comments;
