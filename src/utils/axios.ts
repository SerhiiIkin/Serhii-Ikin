import axios from 'axios';

import type { DonutType } from '@modules/DonutType';
import type { JobType } from '@modules/JobType';
import type { ProjectType } from '@modules/ProjectType';
import type { messageType } from '@modules/messageType';
import type { skillsListGroupType } from '@modules/skillsListGroupType';
import type { SectionTitleDesciptionType } from '@modules/textType';

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

export const getImagesAxios = async (folderName: string) =>
  await axiosInstance
    .get('api/images/getImages', { params: { id: folderName } })
    .then(res => res.data);

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

export const updateForsideWelcomeDescription = async (data: {
  ukr: string;
  eng: string;
  dk: string;
}) =>
  axiosInstance
    .put('/api/forside/welcome/description', data)
    .then(res => res.data);

export const getForsideWelcomeDescription = async () =>
  await axiosInstance
    .get('/api/forside/welcome/description')
    .then(res => res.data);

export const createSkillAxios = async (data: skillsListGroupType) =>
  axiosInstance.post('api/forside/welcome/skill', data);

export const getSkillsAxios = async () =>
  await axiosInstance.get('/api/forside/welcome/skill').then(res => res.data);

export const updageSkillAxios = async (data: skillsListGroupType) => {
  return axiosInstance
    .put(`/api/forside/welcome/skill/`, data)
    .then(res => res.data);
};

export const createSectionTitleTextAxios = async (
  data: SectionTitleDesciptionType
) => axiosInstance.post('/api/sectionTitleText', data).then(res => res.data);

export const getAllSectionTitleDescription = async () =>
  await axiosInstance.get('/api/sectionTitleText').then(res => res.data);

export const getSectionTitleDescription = async (key: string) =>
  await axiosInstance.get(`/api/sectionTitleText/${key}`).then(res => res.data);

export const updateSectionTitleTextAxios = async (
  data: SectionTitleDesciptionType
) =>
  await axiosInstance.put(`/api/sectionTitleText`, data).then(res => res.data);

export const createJobAxios = async (data: JobType) =>
  axiosInstance.post('api/blog/job', data).then(res => res.data);

export const getJobsAxios = async () =>
  await axiosInstance.get('api/blog/job').then(res => res.data);

export const removeJobAxios = async (id: string) =>
  await axiosInstance.delete(`api/blog/job/${id}`).then(res => res.data);

export const updateJobAxios = async (data: JobType) =>
  await axiosInstance.put('api/blog/job', data).then(res => res.data);
