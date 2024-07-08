import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useMemo, useState } from 'react';
import { FaArrowRight, FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import type { ProjectContentProps } from '@modules/ProjectContentProps';

import Button from '@components/Button';
import { ProjectContext } from '@components/Layouts/ProjectContext';
import Notification from '@components/Notification';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import axios from '@utils/axios';
import { classes } from '@utils/classes';

const ProjectContent = ({
  _id,
  images,
  title,
  description,
}: ProjectContentProps) => {
  const { isAdmin, isDescription, classNameProject } =
    useContext(ProjectContext);
  const linkText = Multilanguage({ ukr: 'Більше', eng: 'More', dk: 'Mere' });
  const queryClient = useQueryClient();
  const [textNotification, setTextNotification] = useState('');
  const srcFirstImage = useMemo(() => images[0].fileUrl, [images]);
  const titleMultilanguage = Multilanguage(title);
  const descriptionMultilanguage = Multilanguage(description);

  const removeImages = useMutation({
    mutationFn: async () => {
      const folderName = images[0]?.fileName.split('/')[0];
      const response = await axios.delete(`api/images`, {
        data: { folderName },
      });
      return response.data;
    },
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        setTextNotification(data.message);
      }
    },
    onError: error => setTextNotification(error.message),
  });

  const removeProjectMutation = useMutation({
    mutationKey: ['projects'],
    mutationFn: async () => {
      const response = await axios.delete(`api/projects/${_id}`);
      return { message: response.data.message };
    },
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        setTextNotification(data.message);
      }
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: err => setTextNotification(err.message),
  });

  const removeProject = () => {
    removeProjectMutation.mutate();
    removeImages.mutate();
  };

  return (
    <div  className={classes(['grid gap-2', classNameProject?.content ?? ''])}>
      <Title
        typeTitle="h3"
        className={classes([
          'capitalize text-primaryDarkBlue',
          classNameProject?.title ?? '',
        ])}
      >
        {titleMultilanguage}
      </Title>
      <img
        className={classes([
          'aspect-video w-full object-cover',
          classNameProject?.img ?? '',
        ])}
        src={srcFirstImage}
        alt={titleMultilanguage}
      />
      {isDescription && (
        <p
          className={classes([
            'text-primaryLigth',
            classNameProject?.description ?? '',
          ])}
        >
          {descriptionMultilanguage}
        </p>
      )}
      <div className={'flex gap-2 sm:pb-0'}>
        <Link
          className={classes([
            'flex items-center gap-x-2 rounded bg-primaryOrange px-4 py-2 text-primaryLigth last:ml-0',
            'xl:hover:bg-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500',
            classNameProject?.link ?? '',
          ])}
          to={`/portfolio/${_id}`}
        >
          {linkText} <FaArrowRight />
        </Link>
        {isAdmin && (
          <Link
            type="button"
            to={`editProject/${_id}`}
            className={
              'ml-auto rounded bg-primaryOrange px-4 py-2 text-primaryLigth last:ml-0 xl:hover:bg-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500'
            }
          >
            <FaEdit />
          </Link>
        )}
        {isAdmin && (
          <Button onClick={removeProject} type="button">
            <FaRegTrashAlt />
          </Button>
        )}
      </div>
      <Notification textNotification={textNotification} />
    </div>
  );
};

export default ProjectContent;
