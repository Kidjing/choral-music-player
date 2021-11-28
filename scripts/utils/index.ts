/*
 * 构建流程的工具函数
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * 遍历目录获取目录下的文件数组
 */
const getAllFiles = (root: string) => {
    let res: string[] = [];

    const files = fs.readdirSync(root);

    files.forEach((file) => {
        const pathname = path.join(root, file);
        const stat = fs.lstatSync(pathname);

        if (!stat.isDirectory()) {
            res.push(pathname);
        } else {
            res = res.concat(getAllFiles(pathname));
        }
    });
    return res;
};

/**
 * 获取分支名
 */
const getBranchName = (projectDir: string) => {
    let branchName = 'empty-branch';
    try {
        branchName = execSync('git symbolic-ref --short -q HEAD', {
            cwd: projectDir,
            encoding: 'utf8',
        });

        branchName = branchName.replace(/\n|\s/gi, '').replace(/\//, '-');
    } catch (err) {}

    return branchName;
};

/**
 * 获取 commit hash
 */
const getCommitHash = (projectDir: string) => {
    let commitHash = 'empty-hash';
    try {
        commitHash = execSync('git rev-parse --short HEAD', {
            cwd: projectDir,
            encoding: 'utf8',
        });
        commitHash = commitHash.replace('\n', '');
    } catch (err) {}

    return commitHash;
};

/**
 * 获取启动构建的分钟时间
 */
const getBuildMinutes = () => {
    function padStart(num: number) {
        return `0${num}`.slice(-2);
    }

    const now = new Date();

    const today = `${now.getFullYear()}${padStart(now.getMonth() + 1)}${padStart(now.getDate())}`;
    const time = `${padStart(now.getHours())}${padStart(now.getMinutes())}`;

    return `${today}-${time}`;
};

/**
 * 获取构建完成时间戳
 */
const getBuildFinishTime = () => {
    const addZero = (num: number) => `0${num}`.slice(-2);

    const now = new Date();
    const hours = addZero(now.getHours());
    const minutes = addZero(now.getMinutes());
    const seconds = addZero(now.getSeconds());

    return `@${hours}:${minutes}:${seconds}`;
};

export { getAllFiles, getBranchName, getCommitHash, getBuildMinutes, getBuildFinishTime };
