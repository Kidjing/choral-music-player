declare const WEBPACK_SENTRY_DSN: string;
declare const WEBPACK_SENTRY_DSN_PROJECT_ID: string;

// 图片 import 类型声明
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.gif';

declare interface Window {
    /**
     * 发布版本号
     */
    GLOBAL_RELEASE_VERSION: string;

    /**
     * sentry 上报
     */
    Raven: any;

    /**
     * weblog 上报
     */
    log: any;
}
