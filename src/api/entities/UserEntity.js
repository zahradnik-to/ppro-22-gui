const USER = 'user';
const USERS = 'userS';

const Get = {
  url: `${USER}/get`,
  method: "get",
  withCredentials: true
}

const List = {
  url: `${USERS}`,
  method: "post",
  withCredentials: true,
}

const Register = {
  url: `/register`,
  method: "post",
  withCredentials: true
}

const Login = {
  url: `/login`,
  method: "post",
  withCredentials: true
}

const Logout = {
  url: `/logoutUser`,
  method: "post",
  withCredentials: true
}

const UpdateInfo = {
  url: `${USER}/update/info`,
  method: "put",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
}

const UpdateRole = {
  url: `${USER}/update/role`,
  method: "put",
  withCredentials: true,
}

const MyOrders = {
  url: `${USER}/my-orders`,
  method: "get",
  withCredentials: true,
}

const UpdatePassword = {
  url: `${USER}/update/password`,
  method: "put",
  withCredentials: true
}

const Delete = {
  url: `${USER}/delete`,
  method: "delete",
  withCredentials: true,
}

export default {
  Get,
  List,
  Register,
  Login,
  Logout,
  UpdateInfo,
  UpdatePassword,
  UpdateRole,
  MyOrders,
  Delete,
};