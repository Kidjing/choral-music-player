/*
 * 项目构建配置
 *
 * 静态配置, 构建命令中指定的动态配置不在这里
 */

import path from 'path';
import { getBranchName, getCommitHash, getBuildMinutes } from './utils';

/**
 * 项目名称
 */
const projectName = 'choral-music-player';

/**
 * 项目根目录
 */
const projectDir = path.join(__dirname, '..');

/**
 * 打包输出目录
 */
const outputPath = path.join(projectDir, 'dist');

/**
 * 公开目录
 */
const publicPath = path.join(projectDir, 'public');

/**
 * 静态资源的 cdn 路径
 */
const cdnPath = `./`;

/**
 * 生成页面的 html 资源位置
 * 这个的 `template` 是源码中的模板路径, 不是项目工程名称 `template`
 */
const entryTemplatePath = './src/template/';

/**
 * 发布版本号
 */
const releaseVersion = `${getBuildMinutes()}-${projectName}-${getBranchName(projectDir)}-${getCommitHash(projectDir)}`;


const HASH = '-[contenthash:10]';

export {
    projectName,
    projectDir,
    outputPath,
    publicPath,
    cdnPath,
    entryTemplatePath,
    HASH,
    releaseVersion,
};
