import { Comment, Button, Input, Message, Space } from '@arco-design/web-react';
import { IconMessage, IconThumbUp } from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { operateComment } from 'src/api/comment';
import { IComment } from '../../api/types/comment';
import { ICreator } from '../../api/types/user';
import { dateTrans } from '../../utils/timetrans';

import './index.less';

interface CommentItemProps {
    comment: IComment;
    creator: ICreator;
    status: boolean;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment, creator, status } = props;
    const { user, content, time, likedCount, liked, commentId } = comment;
    const [like, setLike] = useState<boolean>(liked);
    const [reply, setReply] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [searchParams] = useSearchParams();

    const replyComment = () => {
        const id = Number(searchParams.get('id'));
        operateComment({ t: 2, type: 0, id: id, content: value, commentId: commentId })
    };

    const actions = [
        <span
            className="comment-action"
            key="like"
            onClick={() => {
                if (status) {
                    setLike(!like);
                } else {
                    Message.info({ content: '点赞需要先登录哦!', showIcon: true, position: 'top' });
                }
            }}
        >
            {like ? <IconThumbUp style={{ color: '#f53f3f' }} /> : <IconThumbUp />}{' '}
            {!!likedCount && <span>{likedCount + (like ? 1 : 0)}</span>}
        </span>,
        <span
            className="comment-action"
            key="reply"
            onClick={() => {
                if (status === false) {
                    Message.info({ content: '评论需要先登录哦!', showIcon: true, position: 'top' });
                } else {
                    setReply(!reply);
                }
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
            {reply && (
                <Comment
                    align="right"
                    actions={[
                        <Button key="0" type="secondary">
                            取消
                        </Button>,
                        <Button key="1" type="primary" onClick={replyComment}>
                            评论
                        </Button>,
                    ]}
                    author={creator.nickname}
                    avatar={creator.avatarUrl}
                    content={
                        <div>
                            <Input.TextArea
                                placeholder={'回复_' + user.nickname + ':'}
                                value={value}
                                onChange={(e) => setValue(e)}
                            />
                        </div>
                    }
                />
            )}{' '}
        </Comment>
    );
};

interface Comment {
    commentList: IComment[];
    creator: ICreator;
    status: boolean;
    sort: boolean;
    setSort: Function;
}

const Comments = (props: Comment) => {
    const { commentList, creator, status, sort } = props;
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState<string>('');
    const addComment = () => {
        const id = Number(searchParams.get('id'));
        operateComment({ t: 1, type: 0, id: id, content: value }).then(res=>{
            if(res.code===200){
                Message.success('评论成功');
            }else if(res.code===250){
                Message.error(res.message as string);
            }
        });
    };
    return (
        <div className="comments">
            <div className="comments-top">
                <Comment
                    align="right"
                    actions={[
                        <Button key="0" className="btn-cancel">
                            取消
                        </Button>,
                        <Button
                            key="1"
                            className="btn"
                            onClick={() => {
                                if (status === false) {
                                    Message.info({ content: '评论请先登录哦!', showIcon: true, position: 'top' });
                                } else {
                                    addComment();
                                }
                            }}
                        >
                            评论
                        </Button>,
                    ]}
                    avatar={creator.avatarUrl}
                    content={
                        <div>
                            <Input.TextArea placeholder="评论" value={value} onChange={(e) => setValue(e)} />
                        </div>
                    }
                />
            </div>
            <div className="comments-list">
                <Space className="space">
                    <Button
                        className={sort ? 'btn' : 'btn-noactive'}
                        onClick={() => {
                            props.setSort(true);
                        }}
                    >
                        热评
                    </Button>
                    <Button
                        className={sort ? 'btn-noactive' : 'btn'}
                        onClick={() => {
                            props.setSort(false);
                        }}
                    >
                        最新评论
                    </Button>
                </Space>

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
