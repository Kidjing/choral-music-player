const timeTrans=(dt:number):string=>{
    const minutes=Math.round((dt % (1000 * 60 * 60)) / (1000 * 60));
    const seconds=Math.round((dt % (1000 * 60)) / 1000);
    return minutes+':'+seconds;
}

export default timeTrans;