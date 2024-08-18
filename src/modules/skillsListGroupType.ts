export type skillsListGroupType = {
  title: string;
  list: listDetailsType[];
  _id?: string;
};

type listDetailsType = {
  subtitle: string;
  skills: string[];
};
