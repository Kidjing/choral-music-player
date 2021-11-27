import type { IBuildOptions } from '../index';
import { HASH, outputPath, cdnPath, projectName } from '../config';

/**
 * 获取项目构建出口
 */
const getOutput = ({ isProduction }: IBuildOptions) => {
    const output = {
        filename: isProduction ? `[name]${HASH}.js` : '[name].js',
        path: outputPath,
        publicPath: isProduction ? cdnPath : `/${projectName}/`,
        chunkFilename: isProduction ? `[name]${HASH}.js` : '[name].js',
    };

    return output;
};

export default getOutput;
