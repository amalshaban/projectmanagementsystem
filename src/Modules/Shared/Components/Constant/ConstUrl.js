
const BASEURL="https://upskilling-egypt.com:3003/api/v1/Users"
// https://upskilling-egypt.com:3003/api/v1/

export const PATTERNPASSWORD = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: "password should be valid Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
}
export const PATTERNEMAIL = {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: "Email should be valid ",
}
export const USERSURL={
    POSTLOGIN:BASEURL,
    POSTEMPLOYEE:`${BASEURL}/Register`,
    POSTMANAGER:`${BASEURL}/Create`,
    GITUSERID:(id)=>`${BASEURL}/${id}`,
    PUTUSERID:(id)=>`${BASEURL}/${id}`,
    GETUSERSCOUNT:`${BASEURL}/count`,
    GETUSERSMANAG:`${BASEURL}/Manager`,
    PUTVERIFY:`${BASEURL}/verify`,


}