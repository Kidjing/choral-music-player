export interface IAction<T>{
    type:string;
    payload:T;
}

export interface ITag{
    name:string;
    isCheck?:boolean;
}
