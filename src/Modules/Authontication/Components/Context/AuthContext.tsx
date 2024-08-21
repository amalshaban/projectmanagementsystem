import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "react";


export let AuthContext = createContext(null);

export default function AuthContextProvider(props:PropsWithChildren){

let [loginData, setLoginData ]= useState(null);
let saveLoginData=() => {
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
console.log(decodedToken);
console.log(loginData);

}
useEffect(() => {
  if(localStorage.getItem("token"))
  {
    saveLoginData();
  }

  return () => {
    
  }
}, [])

    return<AuthContext.Provider value={{ saveLoginData , loginData }}>
        {props.children}
    </AuthContext.Provider>
}

