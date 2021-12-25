export interface ILoginInRequest {
    phone: string;
    password: string;
}
export interface ILoginInResponce {
    loginType: number;
    code: number;
    account: IAccount;  // 账户信息
    token: string;  // token信息
    profile: IProfile;  // 个人详细信息
    bindings: IBindingsItem[];  // 和返回值所绑定的一些信息
    cookie: string;  // 很重要cookie，后续很多参数需要cookie
    msg?:string;
}

export interface ILoginStatus {
    account: IAccount,
    profile: IProfile,
}

export interface IAccount {
    id: number;  // 用户id
    userName: string;  // 账户名
    createTime: number;   // 创建时间
}
// 个人简介
export interface IProfile {
    detailDescription: string;  // 简介
    userId: number;  // 用户id
    gender: number;  // 性别
    nickname: string;  // 昵称
    avatarUrl: string; // 头像url
    avatarImgId: number;   // 头像ID
    avatarImgIdStr: string;  // 头像ID String
    backgroundUrl: string;  // 背景图片地址
    backgroundImgId: number;  // 背景图片地址id
    backgroundImgIdStr: string; // 背景图片地址id string
    birthday: number;  // 生日
    city: number;  // 所在城市
    province: number;  // 所在省份
    description: string;  // 简要简介
    signature: string;  // 签名
    followeds: number;  // 被关注的人数
    follows: number;    // 关注的人数
    eventCount: number;    // 时间数
    playlistCount: number;  // 歌单数量
    playlistBeSubscribedCount: number;  // 歌单被订阅数量
}
interface IBindingsItem {
    userId: number; // 用户id
    expired: boolean; // 绑定是否过期
    bindingTime: number;  // 绑定的时间
    tokenJsonStr: string;  // token所包含的字符串
    expiresIn: number;  // 过期时间
    refreshTime: number;  // 缓冲时间
    id: number; // tokenID
}
