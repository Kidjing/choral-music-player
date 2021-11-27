import React from "react";

interface ButtonProps{
    type:string;
}

const Button=(props:ButtonProps)=>{
    return(
        <div>
            {props}
        </div>
    )
}

export default Button;