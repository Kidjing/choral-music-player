import type { IBuildOptions } from '../index';
import path from 'path';
import { projectDir, entryTemplatePath } from '../config';
import entryList from './get-entry-list';

/**
 * 获取项目构建入口
 */
const getEntry = ({isProduction}: IBuildOptions) => {
    const entry = entryList.reduce(
        (
            pre: {
                [propName: string]: string;
            },
            cur: {
                key: string;
                js: string;
            },
        ) => {
            const previous = pre;
            previous[cur.key] = path.join(projectDir, entryTemplatePath, cur.js);
            return previous;
        },
        {},
    );

    return entry;
};

export default getEntry;
