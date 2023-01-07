const URL = 'event';

const Get = {
  url: `${URL}/get`,
  method: "get",
}

const List = {
  url: `${URL}/list`,
  method: "post",
}

const Create = {
  url: `${URL}/create`,
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
  Create,
  Update,
  Delete
};