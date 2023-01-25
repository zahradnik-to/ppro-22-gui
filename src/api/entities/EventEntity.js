const EVENT = 'event';
const EVENTS = 'events';

const Get = {
  url: `${EVENT}/get`,
  method: "get",
}

const GetAsSeller = {
  url: `${EVENT}/get-as-seller/`,
  method: "get",
  withCredentials: true,
}

const GetEventsOfSeller = {
  url: `${EVENTS}/seller`,
  method: "get",
}

const ListEvents = {
  url: `${EVENTS}`,
  method: "get",
}

const Create = {
  url: `${EVENT}/create`,
  method: "post",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
}

const Update = {
  url: `${EVENTS}/update`,
  method: "put",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
}

const Cancel = {
  url: `${EVENT}/cancel`,
  method: "delete",
  withCredentials: true
}

export default {
  Get,
  GetAsSeller,
  GetEventsOfSeller,
  ListEvents,
  Create,
  Update,
  Cancel
};