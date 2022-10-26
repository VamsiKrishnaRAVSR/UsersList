import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { User } from "../types";

export const sleep = () => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => res(), 1500);
  });
};

export const getUsers = () =>
  sleep().then(() => axios.get(API_ROUTES.GET_USERS).then((data) => data.data));

export const getUser = (id: string) => {
  const url = API_ROUTES.GET_USER.replace(":id", id);
  return sleep().then(() => axios.get(url).then((data) => data.data));
};

export const postUser = (data: User) => {
  console.log(data);
  sleep().then(() =>
    axios.post(API_ROUTES.POST_USER, data)
  );
};

export const patchUser = (data: User) => {
  const url = API_ROUTES.GET_USER.replace(":id", String(data?.id));
  sleep().then(() => axios.patch(url, data).then((res) => console.log(res)));
};

export const deleteUser = (id: string) => {
  const url = API_ROUTES.GET_USER.replace(":id", id);
  sleep().then(() => axios.delete(url));
};
