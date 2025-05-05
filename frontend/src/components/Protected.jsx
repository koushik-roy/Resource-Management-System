import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Protected(props) {
    const {Component}=props;
    let history = useHistory();
    useEffect(()=>{
        let login=localStorage.getItem('login');
        if(!login){
            history.push("/");
        }
    });
  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected