import type { Configuration } from 'webpack';
import type { IBuildOptions } from '../index';
import path from 'path';
import { projectDir } from '../config';
import getEntry from './entry';
import getOutput from './output';
import getModule from './module';
import getPlugins from './plugins';

/**
 * 获取 webpack 构建配置
 */
const getWebpackConfig = (options: IBuildOptions): Configuration => {
    const { isProduction } = options;

    /**
     * 简单配置项, 在 config 中直接设置属性, 比如: mode
     * 复杂配置项, 建议抽到独立文件, 在独立文件中生成, 比如: entry: getEntry()
     */
    const config = {
        mode: (isProduction ? 'production' : 'development') as Configuration['mode'],
        resolve: {
            extensions: ['.js', '.ts', '.jsx', '.tsx'],
            alias: {
                src: path.resolve(projectDir, 'src'),
            },
        },
        externals: {
            // react 和 react-dom 直接使用 library 库版本
            react: 'React',
            'react-dom': 'ReactDOM',
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
        optimization: {
            minimize: isProduction,
        },
        entry: getEntry(options),
        output: getOutput(options),
        module: getModule(options),
        plugins: getPlugins(options),
    };

    return config;
};

export default getWebpackConfig;
