/*
 * 获取构建的资源入口
 * @Author: CntChen
 * @Date: 2020-05-09
 */

import path from 'path';
import { getAllFiles } from '../utils';
import { projectDir, entryTemplatePath } from '../config';

const entryPath = path.join(projectDir, entryTemplatePath);
const fileListInsideEntryPath = getAllFiles(entryPath);

const htmlFileList = fileListInsideEntryPath
    .filter((file: string) => /\.html$/.test(file)) // 只保留 html 资源
    .map((file: string) => file.replace(entryPath, '').replace('.html', '')); // 去掉绝对路径

const jsFileList = fileListInsideEntryPath
    .filter((file: string) => /\.ts$/.test(file)) // 只保留 js 资源
    .map((file: string) => file.replace(entryPath, '').replace('.ts', '')); // 去掉绝对路径

// 匹配 js 的 html 资源检查
jsFileList.forEach((file: string) => {
    if (htmlFileList.indexOf(file) === -1) {
        console.log('启动构建失败:');
        throw new Error(`请确认有无 ${path.resolve(entryTemplatePath, file)}.html 文件`);
    }
});

// 匹配 html 的 js 资源检查
htmlFileList.forEach((file: string) => {
    if (jsFileList.indexOf(file) === -1) {
        console.log('启动构建失败:');
        throw new Error(`请确认有无 ${path.resolve(entryTemplatePath, file)}.ts 文件`);
    }
});

/**
 * 构建入口列表
 * 列表示例
    [
        { key: 'index', js: 'index.ts', html: 'index.html' },
        { key: 'm/index', js: 'm/index.ts', html: 'm/index.html' },
        { key: 'm/send', js: 'm/send.ts', html: 'm/send.html' },
        { key: 'send', js: 'send.ts', html: 'send.html' }
    ]
*/
const entryList = jsFileList.map((cur: string) => ({
    key: cur,
    js: `${cur}.ts`,
    html: `${cur}.html`,
}));

// 调试构建入口列表
// console.log('构建入口列表\n', entryList);

export default entryList;
