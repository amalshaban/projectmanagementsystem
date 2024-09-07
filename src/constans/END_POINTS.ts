export const AuthorizedToken = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export const AuthorizedTokenWithParam = (title: string, pageSize: number, pageNumber: number) => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  params: {
    title: title,
    pageSize: pageSize,
    pageNumber: pageNumber,
  },
});





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


const BASE_PROJECTS = `${BASE_URL}/Project` ;

export const PROJECT_URLS = {
  getlist: `${BASE_PROJECTS}/manager`,
  getlistEmplyee: `${BASE_PROJECTS}/employee`,
 

  addproject: `${BASE_PROJECTS}`,
  delete: (id: string) => `${BASE_PROJECTS}/${id}`,
  update: (id:number) =>`${BASE_PROJECTS}/${id}`,

}

export const TasksUrl={
  GetTasksmanager: `${BASE_URL}/Task/manager`,
  GetTaskEmploee:`${BASE_URL}/Task/count`,
}

//TASKS urls
const BASE_TASKS = `${BASE_URL}/Task`;

export const TASKS_URLs = {
  TotalTasks: `${BASE_TASKS}/count`,
  getlist:  `${BASE_TASKS}/manager`,
    AddTask: `${BASE_URL}/Task`,
    update: (id:string)=>`${BASE_URL}/Task/${id}`,
    delete: (id:string)=>`${BASE_URL}/Task/${id}`,
    getAllTasks: `${BASE_URL}/Task`,
    changeStatus:(id:string)=>`${BASE_URL}/Task/${id}/change-status`
};
