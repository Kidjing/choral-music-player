import type { IBuildOptions } from '../index';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ArcoWebpackPlugin from '@arco-design/webpack-plugin';
import { HASH, entryTemplatePath, releaseVersion } from '../config';
import entryList from './get-entry-list';

const LibraryMap = {
    LIBRARY__react: 'https://unpkg.com/react@17/umd/react.production.min.js',
    LIBRARY__react_dom: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
};

/**
 * 获取项目构建插件
 */
const getPlugins = ({ isProduction }: IBuildOptions) => {
    
    const plugins = [
        // 将 node 的运行环境传递到 webpack 的构建环境
        // 用于设置 react / react-dom 为调试模式; 除非调试 lib 库本身错误, 正常不需要开启
        // new webpack.EnvironmentPlugin(['NODE_ENV']),
        new MiniCssExtractPlugin({
            filename: isProduction ? `[name]${HASH}.css` : '[name].css',
            chunkFilename: isProduction ? `[name]${HASH}.css` : '[name].css',
        }),
        new ArcoWebpackPlugin({
            theme: '@arco-themes/react-choral'
        })
    ];

    /**
     * html 生成插件列表
     */
    const HtmlWebpackPluginList = entryList.reduce(
        (
            pre: any[],
            cur: {
                html: string;
                key: string;
            },
        ) => {
            pre.push(
                new HtmlWebpackPlugin({
                    template: path.join(entryTemplatePath, cur.html),
                    filename: cur.html,
                    minify: isProduction,
                    // 只包含该 html 对应 entry 的 chunk
                    chunks: [cur.key],
                    templateParameters: {
                        ...LibraryMap,
                        GLOBAL_RELEASE_VERSION: releaseVersion,
                    },
                    // 定义为 defer, 因为业务源码经常迭代, 所以缓存会失效
                    // 在 head 中指定为 defer 实现优先加载, 但是晚于依赖库执行
                    // 依赖库 react / raven 等基本不会升级版本, 本地有长缓存
                    scriptLoading: 'defer',
                }),
            );
            return pre;
        },
        [],
    );

    plugins.push(...HtmlWebpackPluginList);

    return plugins;
};

export default getPlugins;
