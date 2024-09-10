import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProjectContext } from '@context/ProjectContext';
import { ToastContext } from '@context/ToastContext';

import Multilanguage from '@utils/Multilanguage';
import { deleteProjectAxios, removeImagesAxios } from '@utils/axios';

import type { CarouselProps } from '@modules/CarouselProps';
import type { ProjectContentProps } from '@modules/ProjectContentProps';

export const useProjectContent = (props: ProjectContentProps) => {
  const { classNameProject } = useContext(ProjectContext);
  const { _id, title, description, images } = props;
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const linkText = Multilanguage({
    ukr: 'Подивитись онлайн / GitHub',
    eng: 'View online / GitHub',
    dk: 'Se online / GitHub',
  });
  const titleMultilanguage = Multilanguage(title);
  const descriptionMultilanguage = Multilanguage(description);

  const queryClient = useQueryClient();

  const imagesURL = useMemo(
    () =>
      images != undefined && images.length > 0
        ? images.map(image => image.fileUrl)
        : [],
    [images]
  );

  const removeImages = useMutation({
    mutationFn: async (folderName: string) => removeImagesAxios(folderName),
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        toast.success('Картинки видалено з серверу');
      }
    },
    onError: error => toast.error(error.message),
  });

  const removeProjectMutation = useMutation({
    mutationKey: ['projects'],
    mutationFn: async () => deleteProjectAxios(_id ?? ''),
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        toast.success('Проєкт успішно видалено');
      }
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: err => toast.error(err.message),
  });

  const removeProject = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const folderName = images[0]?.fileName.split('/')[0];
    removeProjectMutation.mutate();
    removeImages.mutate(folderName);
  };

  const navigateToEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`editProject/${_id}`);
  };

  const config: CarouselProps = {
    data: imagesURL,
    spaceBetween: 120,
    draggable: true,
    interval: 0,
    duration: 1000,
    classNameProject: classNameProject ?? {},
  };

  return {
    config,
    linkText,
    titleMultilanguage,
    descriptionMultilanguage,
    removeProject,
    navigateToEdit,
    imagesURL,
  };
};
