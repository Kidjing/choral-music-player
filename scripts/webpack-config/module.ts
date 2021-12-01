import type { IBuildOptions } from '../index';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { HASH } from '../config';

/**
 * 获取项目构建 loader
 */
const getModule = ({ isProduction }: IBuildOptions) => {
    const module = {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                sourceMap: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 图片资源抽离为独立文件的阈值
                            limit: 4096,
                            fallback: 'file-loader',
                            // 用于 file-loader 的配置
                            name: isProduction ? `[name]${HASH}.[ext]` : '[name].[ext]',
                            outputPath: 'image',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: !isProduction,
                        },
                    },
                ],
            },
        ],
    };

    return module;
};

export default getModule;
