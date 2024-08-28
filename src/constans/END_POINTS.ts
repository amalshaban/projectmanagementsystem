export const AuthorizedToken = {
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
};

const BASE_URL = "https://upskilling-egypt.com:3003/api/v1";

//USERS urls
const BASE_USERS = `${BASE_URL}/Users`;

export const USERS_URLs = {
  Login: `${BASE_USERS}/Login`,
  ChangePassword: `${BASE_USERS}/ChangePassword`,
  ForgetPass: `${BASE_USERS}/Reset/Request`,
  Reset: `${BASE_USERS}/Reset`,
  Verify: `${BASE_USERS}/verify`,
  Register: `${BASE_USERS}/Register`,
  Usercount: `${BASE_USERS}/count`,
  TotalUsers: `${BASE_USERS}/count`,
  TotalManager: `${BASE_USERS}/Manager`,
  currentUser: `${BASE_USERS}/currentUser`,
};
export const TasksUrl={
  GetTasksmanager: `${BASE_URL}/Task/manager`,
  GetTaskEmploee:`${BASE_URL}/Task/count`
}

//TASKS urls
const BASE_TASKS = `${BASE_URL}/Task`;

export const TASKS_URLs = {
  TotalTasks: `${BASE_TASKS}/count`,
};
