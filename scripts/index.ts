import webpack from 'webpack';
import { execSync } from 'child_process';
import { outputPath, publicPath, releaseVersion } from './config';
import getWebpackConfig from './webpack-config';
import { getBuildFinishTime } from './utils';
import copyFileToPublicPath from './utils/copy-file-to-public-path';

export interface IBuildOptions {
    /**
     * 构建是否为生产模式
     */
    isProduction: boolean;
}

class Build {
    /**
     * 构建动态参数, 从构建命令中传递到构建流程
     */
    private options: IBuildOptions;
    /**
     * 前置构建的配置, 比如 lib 文件复制到发布目录等
     */
    private preWorkConfig: any = undefined;
    /**
     * 资源入口打包配置
     */
    private webpackConfig;

    public constructor() {
        this.options = {
            // 从构建命令中获取构建动态参数
            isProduction: process.env.NODE_ENV === 'production',
            // 在这里添加新的构建动态参数, 比如 isForMobile
        };

        this.webpackConfig = getWebpackConfig(this.options);
    }

    public build() {
        this.beforeBuild();

        if (this.options.isProduction) {
            this.distBuild();
        } else {
            this.devBuild();
        }
    }

    private beforeBuild() {
        console.log('当前构建版本:', releaseVersion);

        // 清理构建目录
        execSync(`rm -rf ${outputPath}`);
        execSync(`rm -rf ${publicPath}`);
    }

    private distBuild() {
        const compiler = webpack([this.preWorkConfig, this.webpackConfig].filter((c) => !!c));

        compiler.run(this.logStats.bind(this));
    }

    private devBuild() {
        const compiler = webpack([this.preWorkConfig, this.webpackConfig].filter((c) => !!c));

        compiler.watch(
            {
                ignored: ['node_modules', 'scripts'],
                aggregateTimeout: 300,
            },
            this.logStats.bind(this),
        );
    }

    private logStats(err: Error | undefined, stats: any) {
        if (!err) {
            console.log(
                stats.toString({
                    all: false,
                    assets: true,
                    chunks: true,
                    errors: true,
                    errorDetails: false,
                    warnings: false,
                    timings: false,
                    colors: true,
                }),
            );
            this.afterBuild();
        } else {
            console.error(err);
        }
    }

    private afterBuild() {
        // 资源处理, 构建日志
        if (this.options.isProduction) {
            console.log('dist: 构建完成', getBuildFinishTime());
            // 复制资源到公开目录
            copyFileToPublicPath();
        } else {
            console.log('dev: 构建完成', getBuildFinishTime());
        }
    }
}

const build = new Build();
build.build();
