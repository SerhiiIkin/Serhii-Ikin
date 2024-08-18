import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getImagesAxios } from '@utils/axios';

export const useGetImages = (folderName: string) => {
  const [images, setImages] = useState({
    sm: '',
    md: '',
    xl: '',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['images', folderName],
    queryFn: () => getImagesAxios(folderName),
  });

  const getImages = async () => {
    if (data) {
      const objectImages = data?.reduce(
        (acc: { sm: string; md: string; xl: string }, str: string) => {
          const size = str.includes('sm')
            ? 'sm'
            : str.includes('md')
              ? 'md'
              : 'xl';
          acc[size] = str;
          return acc;
        },
        {}
      );
      setImages(objectImages);
    }
  };

  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { images, isLoading, error };
};
