/*
 * production 模式下复制 output 目录资源到 public 目录
 */

import path from 'path';
import { execSync } from 'child_process';
import { projectDir, outputPath, publicPath } from '../config';
import { getAllFiles } from '.';

/**
 * 根据当前文件名称获取该文件的目标目录列表
 */
const getFileDestinationList = (file: string) => {
    const destinationList: string[] = [];

    // sourcemap 到独立目录
    if (/\.map/i.test(file)) {
        destinationList.push(file.replace(outputPath, path.join(publicPath, 'sourcemap')));
    }

    // html 资源到 webserver
    if (/\.html/i.test(file)) {
        destinationList.push(file.replace(outputPath, path.join(publicPath, 'webserver')));
    }

    // 其他资源放入 cdn 目录
    if (!/\.(map|html)$/i.test(file)) {
        destinationList.push(file.replace(outputPath, path.join(publicPath, 'cdn')));
    }

    return destinationList;
};

export default () => {
    console.log('\n复制资源到公开目录.');
    const fileListInsideoutputPath = getAllFiles(outputPath);

    // 复制的 from-to 列表
    const fromAndToList: Array<{
        from: string;
        to: string;
    }> = [];
    fileListInsideoutputPath.forEach((file: string) => {
        const destinationList = getFileDestinationList(file);
        destinationList.forEach((destination: string) => {
            fromAndToList.push({
                from: file,
                to: destination,
            });
        });
    });

    const mkdirShellCommand = fromAndToList.reduce((pre, cur) => {
        const command = `mkdir -p ${path.dirname(cur.to)}`;
        const previous = pre ? `${pre} && ${command}` : command;
        return previous;
    }, '');

    const copyShellCommand = fromAndToList.reduce((pre, cur) => {
        const command = `cp -r ${cur.from} ${cur.to}`;
        const previous = pre ? `${pre} && ${command}` : command;
        return previous;
    }, '');

    // 创建所需的目录
    execSync(mkdirShellCommand, { cwd: projectDir, encoding: 'utf8' });
    // 复制资源
    execSync(copyShellCommand, { cwd: projectDir, encoding: 'utf8' });

    console.log('\n复制资源到公开目录. 完成.');
};
