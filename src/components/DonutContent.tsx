import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import type { DonutType } from '@modules/DonutType';

import Button from '@components/Button';
import { DonutContext } from '@components/Context/DonutContext';
import { ToastContext } from '@components/Context/ToastContext';
import ImageSlider from '@components/ImageSlider';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import { removeDonutAxios, removeImagesAxios } from '@utils/axios';

const DonutContent = ({ title, description, images, _id, link }: DonutType) => {
  const toast = useContext(ToastContext);
  const queryClient = useQueryClient();
  const { isAdmin } = useContext(DonutContext);
  const titleLanguage = Multilanguage(title);
  const descriptionLanguage = Multilanguage(description);
  const imagesURL = useMemo(
    () =>
      images != undefined && images?.length > 0
        ? images?.map(image => image.fileUrl)
        : [],
    [images]
  );

  const removeDonutMutation = useMutation({
    mutationKey: ['donate'],
    mutationFn: removeDonutAxios,
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        toast.success(data.message);
      }
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['donate'] });
      }, 3000);
    },
    onError: err => toast.error(err.message),
  });

  const removeImages = useMutation({
    mutationFn: removeImagesAxios,
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: error => toast.error(error.message),
  });

  const removeDonut = () => {
    const folderName = images[0]?.fileName.split('/')[0];
    removeImages.mutate(folderName);
    removeDonutMutation.mutate({ id: _id ?? '' });
  };

  return (
    <li>
      <a href={link} target="_blank" className="mb-4">
        <Title
          typeTitle="h2"
          className="rounded bg-primaryDarkBlue p-2 text-left text-primaryDark duration-500 xl:hover:bg-primaryOrange xl:hover:text-primaryLigth"
        >
          {titleLanguage}
        </Title>
      </a>
      <p className="pb-4">{descriptionLanguage}</p>

      <ImageSlider images={imagesURL} isSlider />
      {isAdmin && (
        <div className="flex gap-2 pt-4">
          <Link
            className="rounded bg-primaryOrange px-4 py-2 text-primaryLigth last:ml-0 xl:hover:bg-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500"
            to={`editDonut/${_id}`}
          >
            Edit
          </Link>
          <Button onClick={removeDonut}>Remove</Button>
        </div>
      )}
    </li>
  );
};

export default DonutContent;
