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
  url: `/logout`,
  method: "post",
  withCredentials: true
}

const Update = {
  url: `${URL}/update`,
  method: "put",
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
  Update,
  Delete,
};