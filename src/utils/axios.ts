import type { DonutType } from '@modules/DonutType';
import type { ProjectType } from '@modules/ProjectType';
import type { messageType } from '@modules/messageType';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER,
});

export const getProjects = async () =>
  axiosInstance.get('api/projects').then(res => res.data);

export const createProjectAxios = async (data: ProjectType) =>
  axiosInstance.post('api/projects', data);

export const updateProjectAxios = async ({
  id,
  data,
}: {
  id: string;
  data: ProjectType;
}) => axiosInstance.put(`api/projects/${id}`, data).then(res => res.data);

export const getSingleProjectAxios = async (id: string) =>
  axiosInstance.get(`api/projects/${id}`).then(res => res.data);
export const getSingleProjectOrInitAxios = async ({
  id,
  initialData,
}: {
  id: string;
  initialData: ProjectType;
}) => {
  return id
    ? await axiosInstance.get(`api/projects/${id}`).then(res => res.data)
    : initialData;
};

export const deleteProjectAxios = async (id: string) => {
  const response = await axiosInstance.delete(`api/projects/${id}`);
  return { message: response.data.message };
};

export const getDonuts = async () =>
  axiosInstance.get('api/donut').then(res => res.data);

export const updateUserMessagesAxios = async ({
  messageData,
  userId,
}: {
  messageData: messageType;
  userId: string;
}) =>
  axiosInstance
    .put(`api/user/messages/${userId}`, messageData)
    .then(res => res.data);

export const removeDonutAxios = async ({ id }: { id: string }) => {
  const response = await axiosInstance.delete(`api/donut/${id}`);
  return { message: response.data.message };
};

export const removeImagesAxios = async (folderName: string) => {
  const response = await axiosInstance.delete(`api/images`, {
    data: { folderName },
  });
  return response.data;
};

export const getSingleDonutAxios = async ({
  id,
  initialData,
}: {
  id: string;
  initialData: DonutType;
}) => {
  return id
    ? await axiosInstance.get(`api/donut/${id}`).then(res => res.data)
    : initialData;
};

export const createDonutAxios = async (data: DonutType) =>
  axiosInstance.post('api/donut', data);

export const updateDonutAxios = async ({
  data,
  id,
}: {
  data: DonutType;
  id: string;
}) => axiosInstance.put(`api/donut/${id}`, data).then(res => res.data);

export const uploadImagesAxios = async (formData: FormData) =>
  axiosInstance.post('api/images', formData);

export const updateImagesAxios = async (formData: FormData) =>
  axiosInstance.put('api/images', formData);

export const createUserAxios = async (username: string) =>
  axiosInstance.post('api/user', { username }).then(res => res.data);

export const loginAdminAxios = async (data: {
  username: string;
  password: string;
}) => axiosInstance.post('api/admin', data).then(res => res.data);

export const getUsersAxios = async () =>
  axiosInstance.get('api/user').then(res => res.data);

export const deleteUserAxios = async (id: string) =>
  axiosInstance.delete(`api/user/${id}`).then(res => res.data);

export const updateTokenAxios = async (id: string) =>
  axiosInstance
    .put(`api/user/token/${id}`, {
      expiry: new Date().getTime() + 24 * 60 * 60 * 1000,
    })
    .then(res => res.data);
