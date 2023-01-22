const URL = 'user';

const Get = {
  url: `${URL}/get`,
  method: "get",
  withCredentials: true
}

const List = {
  url: `${URL}/list`,
  method: "post",
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
  url: `${URL}/update/info`,
  method: "put",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
}

const UpdatePassword = {
  url: `${URL}/update/password`,
  method: "put",
  withCredentials: true
}

const Delete = {
  url: `${URL}/delete`,
  method: "delete",
}

export default {
  Get,
  List,
  Register,
  Login,
  Logout,
  UpdateInfo,
  UpdatePassword,
  Delete,
};