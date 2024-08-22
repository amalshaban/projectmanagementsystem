
export const AuthorizedToken = { 
  headers:{
     Authorization: `Bearer ${localStorage.token}` 
    } };


    
const BASE_URL = "http://upskilling-egypt.com:3003/api/v1";


//USERS urls
const BASE_USERS = `${BASE_URL}/Users`;

export const USERS_URLs = {
  Login: `${BASE_USERS}/Login`,
  ChangePassword: `${BASE_USERS}/ChangePassword`,
  ForgetPass: `${BASE_USERS}/Reset/Request`,
  Reset: `${BASE_USERS}/Reset`,
  Verify: `${BASE_USERS}/verify`,
  Register: `${BASE_USERS}/Register`,
};

