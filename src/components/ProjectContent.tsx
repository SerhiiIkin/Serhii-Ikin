import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useMemo, useState } from 'react';
import { FaArrowRight, FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import type { ProjectContentProps } from '@modules/ProjectContentProps';

import Button from '@components/Button';
import { ProjectContext } from '@components/Context/ProjectContext';
import ImageSlider from '@components/ImageSlider';
import Notification from '@components/Notification';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import { deleteProjectAxios, removeImagesAxios } from '@utils/axios';
import { classes } from '@utils/classes';

const ProjectContent = ({
  _id,
  images,
  title,
  description,
  link,
}: ProjectContentProps) => {
  const { isAdmin, isDescription, classNameProject, isMore, isSlider, isLink } =
    useContext(ProjectContext);

  const moreText = Multilanguage({ ukr: 'Більше', eng: 'More', dk: 'Mere' });
  const linkText = Multilanguage({
    ukr: 'Подивитись онлайн / GitHub',
    eng: 'View online / GitHub',
    dk: 'Se online / GitHub',
  });
  const titleMultilanguage = Multilanguage(title);
  const descriptionMultilanguage = Multilanguage(description);

  const queryClient = useQueryClient();

  const [textNotification, setTextNotification] = useState('');

  const imagesURL = useMemo(
    () =>
      images != undefined && images?.length > 0
        ? images?.map(image => image.fileUrl)
        : [],
    [images]
  );

  const removeImages = useMutation({
    mutationFn: async (folderName: string) => removeImagesAxios(folderName),
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        setTextNotification('Картинки видалено з серверу');
        setTimeout(() => {
          setTextNotification('');
        }, 2000);
      }
    },
    onError: error => setTextNotification(error.message),
  });

  const removeProjectMutation = useMutation({
    mutationKey: ['projects'],
    mutationFn: async () => deleteProjectAxios(_id ?? ''),
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        setTimeout(() => {
          setTextNotification('Проєкт успішно видалено');
        }, 3000);
      }
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      }, 6000);
    },
    onError: err => setTextNotification(err.message),
  });

  const removeProject = () => {
    const folderName = images[0]?.fileName.split('/')[0];
    removeProjectMutation.mutate();
    removeImages.mutate(folderName);
  };

  const [inViewRef, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <>
      <div
        ref={inViewRef}
        className={classes([
          'flex flex-col gap-2',
          inView
            ? 'md:translate-x-0 md:opacity-100 md:duration-1000'
            : 'even:-translate-x-6 md:translate-x-6 md:opacity-0 md:duration-1000 md:motion-reduce:translate-x-0',
          classNameProject?.content ?? '',
        ])}
      >
        <Title
          typeTitle="h2"
          className={classes([
            'capitalize text-primaryDarkBlue',
            classNameProject?.title ?? '',
          ])}
        >
          {titleMultilanguage}
        </Title>
        <ImageSlider
          images={imagesURL}
          imageClasses={classNameProject?.img}
          isSlider={isSlider ?? false}
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
        {isLink && (
          <Link
            target="_blank"
            to={link}
            className="self-start bg-primaryDarkBlue px-4 py-2 text-primaryLigth xl:hover:bg-primaryLigth xl:hover:text-primaryLigthBlue xl:hover:duration-500"
          >
            {linkText}
          </Link>
        )}
        <div className={'mt-auto flex gap-2 sm:pb-0'}>
          {isMore && (
            <Link
              className={classes([
                'mr-auto flex items-center gap-x-2 rounded bg-primaryOrange px-4 py-2 text-primaryLigth last:ml-0',
                'xl:hover:bg-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500',
                classNameProject?.link ?? '',
              ])}
              to={`/portfolio/${_id}`}
            >
              {moreText} <FaArrowRight />
            </Link>
          )}
          {isAdmin && (
            <Link
              type="button"
              to={`editProject/${_id}`}
              className={
                'rounded bg-primaryOrange px-4 py-2 text-primaryLigth last:ml-0 xl:hover:bg-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500'
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
      </div>
      <Notification textNotification={textNotification} />
    </>
  );
};

export default ProjectContent;
