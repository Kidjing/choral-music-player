/**
 * 
 * @param dt :时长ms
 * @returns 时长分钟
 */
export const timeToMinute = (dt: number): string => {
    const minutes = Math.round((dt % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.round((dt % (1000 * 60)) / 1000);
    return minutes + ':' + seconds;
};


/**
 * 
 * @param num :时间戳
 * @returns 具体时间
 */
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
