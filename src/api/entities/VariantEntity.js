const URL = 'variant';

const Get = {
  url: `${URL}/get`,
  method: "get",
}

const Order = {
  url: `${URL}/order`,
  method: "post",
  withCredentials: true,
}

const Add = {
  url: `${URL}/add`,
  method: "post",
  withCredentials: true,
}

const Cancel = {
  url: `${URL}/cancel`,
  method: "delete",
  withCredentials: true,
}

export default {
  Get,
  Order,
  Add,
  Cancel
};