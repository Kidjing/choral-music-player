import { Comment, Button, Input } from '@arco-design/web-react';
import { IconMessage, IconThumbUp } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { IComment } from '../../api/types/comment';
import { ICreator } from '../../api/types/user';
import { dateTrans } from '../../utils/timetrans';

import './index.less';

interface CommentsProps {
    commentList: IComment[];
    creator: ICreator;
}

interface CommentItemProps {
    comment: IComment;
    creator: ICreator;
}

const CommentItem = (props: CommentItemProps) => {
    const { comment, creator } = props;
    const { user, content, time, likedCount, liked } = comment;
    const [like, setLike] = useState<boolean>(liked);
    const [reply, setReply] = useState<boolean>(false);

    const actions = [
        <span className="comment-action" key="like" onClick={() => setLike(!like)}>
            {like ? <IconThumbUp style={{ color: '#f53f3f' }} /> : <IconThumbUp />}{' '}
            {!!likedCount && <span>{likedCount}</span>}
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
            {reply && (
                <Comment
                    align="right"
                    actions={[
                        <Button key="0" type="secondary">
                            取消
                        </Button>,
                        <Button key="1" type="primary">
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

const Comments = (props: CommentsProps) => {
    const { commentList, creator } = props;
    return (
        <div className="comments">
            <div className="comments-top">
                <Comment
                    align="right"
                    actions={[
                        <Button key="0" type="secondary">
                            取消
                        </Button>,
                        <Button key="1" type="primary">
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
                            <CommentItem comment={comment} creator={creator} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Comments;
