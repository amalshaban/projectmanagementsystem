
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props:   
 PropsWithChildren) {
  let [loginData, setLoginData] = useState(null);

  let saveLoginData = () => {
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      const decodedToken = jwtDecode(encodedToken);
      setLoginData(decodedToken);
    }
  };

  useEffect(() => {
    saveLoginData();
  }, []); 

  return (
    <AuthContext.Provider value ={{ saveLoginData, loginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}