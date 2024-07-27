import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import type { DonutType } from '@modules/DonutType';

import Button from '@components/Button';
import { DonutContext } from '@components/Context/DonutContext';
import ImageSlider from '@components/ImageSlider';
import Notification from '@components/Notification';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import { removeDonutAxios, removeImagesAxios } from '@utils/axios';

const DonutContent = ({ title, description, images, _id, link }: DonutType) => {
  const [textNotification, setTextNotification] = useState('');
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
        setTextNotification(data.message);
      }
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['donate'] });
      }, 3000);
    },
    onError: err => setTextNotification(err.message),
  });

  const removeImages = useMutation({
    mutationFn: removeImagesAxios,
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        setTextNotification(data.message);
      }
    },
    onError: error => setTextNotification(error.message),
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
          className="rounded bg-primaryDarkBlue p-2 text-left xl:hover:bg-primaryLigthBlue xl:hover:text-primaryLigth xl:hover:duration-500"
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
      <Notification textNotification={textNotification} />
    </li>
  );
};

export default DonutContent;
