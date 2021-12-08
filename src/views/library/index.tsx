import { Comment } from 'src/components';
const comment = [
    {
        user: {
            anonym: 0,
            userId: 391484028,
            userType: 1,
            followed: false,
            mutual: false,
            nickname: '小叽蹲蹲',
            avatarUrl: 'https://p1.music.126.net/nnrCcSB3ShvTh0nR0ellIw==/109951165349884304.jpg',
        },
        beReplied: [],
        commentId: 5471303921,
        content: '小时候蹲点看',
        status: 0,
        time: 1638370100622,
        timeStr: '7天前',
        needDisplayTime: true,
        likedCount: 0,
        liked: false,
        parentCommentId: 0,
        commentLocationType: 2,
    },
    {
        user: {
            followed: false,
            anonym: 0,
            userId: 409041521,
            userType: 0,
            mutual: false,
            nickname: '嘟噜o匈',
            avatarUrl: 'https://p1.music.126.net/4cA7-y3r_aUqC5k8RUZImQ==/19057835044640063.jpg',
        },
        beReplied: [
            {
                user: {
                    followed: false,
                    anonym: 0,
                    userId: 1530426558,
                    userType: 0,
                    mutual: false,
                    nickname: '不说晚安你试试',
                    avatarUrl: 'https://p1.music.126.net/wpzr8TLvrTxShuC-kjwCNQ==/109951166654259753.jpg',
                },
                beRepliedCommentId: 5470677913,
                content: '@顺利力力',
            },
        ],
        commentId: 5476337836,
        content: 'test',
        status: 0,
        time: 1638940292044,
        timeStr: '13:11',
        needDisplayTime: true,
        likedCount: 0,
        liked: false,
        commentLocationType: 2,
        parentCommentId: 5462838137,
    },
];

const creator = {
    userId: 409041521,
    nickname: '嘟噜o匈',
    avatarUrl: 'https://p1.music.126.net/4cA7-y3r_aUqC5k8RUZImQ==/19057835044640063.jpg',
};
const Library = () => {
    return (
        <div className="library">
            <Comment commentList={comment} creator={creator} />
        </div>
    );
};

export default Library;
