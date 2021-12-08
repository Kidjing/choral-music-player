export const timeToMinute = (dt: number): string => {
    const minutes = Math.round((dt % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.round((dt % (1000 * 60)) / 1000);
    return minutes + ':' + seconds;
};

export const dateTrans = (num: number) => {
    const date = new Date(num);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    const h = date.getHours() + ':';
    const m = date.getMinutes() + ':';
    const s = date.getSeconds();
    return Y + M + D + h + m + s
};
