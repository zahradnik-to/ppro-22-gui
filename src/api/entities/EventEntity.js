const URL = 'event';

const Get = {
  url: `${URL}/get`,
  method: "get",
}

const List = {
  url: `events`,
  method: "get",
}

const Create = {
  url: `${URL}/create`,
  method: "post",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
}

const Update = {
  url: `${URL}/update`,
  method: "put",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
}

const Delete = {
  url: `${URL}/delete`,
  method: "delete",
  withCredentials: true
}

export default {
  Get,
  List,
  Create,
  Update,
  Delete
};