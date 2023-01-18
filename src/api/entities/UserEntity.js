const URL = 'user';

const Get = {
  url: `${URL}/get`,
  method: "get",
}

const List = {
  url: `${URL}/list`,
  method: "post",
}

const Register = {
  url: `${URL}/register`,
  method: "post",
}

const Login = {
  url: `${URL}/login`,
  method: "post",
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
  Update,
  Delete
};