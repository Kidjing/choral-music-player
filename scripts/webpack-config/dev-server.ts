import type { IBuildOptions } from '../index';
import path from 'path';

const getDevServer = ({isProduction}:IBuildOptions) => {
    const devServer = {
        static: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        compress: true,
        port: 3001,
        open: true,
        proxy: {
            '/': 'http://localhost:3000',
        },
    };
    return devServer;
};

export default getDevServer;
