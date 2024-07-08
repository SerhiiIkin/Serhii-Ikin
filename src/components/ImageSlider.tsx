import { useEffect, useState } from 'react';

import type { ImageSliderTypes } from '@modules/ImageSliderTypes';

import { classes } from '@utils/classes';

const ImageSlider = ({ images, intervalTime = 5000 }: ImageSliderTypes) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images?.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images, intervalTime]);

  return (
    <article className={classes(['relative flex overflow-hidden'])}>
      {images?.length > 1 ? (
        <>
          {images.map((image, index) => (
            <img
              className={classes([
                'order-1 max-h-[40dvh] min-w-full object-contain opacity-0 duration-[4s]',
                index === currentImageIndex
                  ? 'opacity-1 order-0 duration-[4s]'
                  : '',
              ])}
              key={image}
              src={image}
              loading="lazy"
              alt="product"
            />
          ))}
        </>
      ) : (
        <img
          className={classes([
            'opacity-1 max-h-[40dvh] min-w-full object-contain duration-[4s]',
          ])}
          key={images[0]}
          src={images[0]}
          loading="lazy"
          alt="product"
        />
      )}
    </article>
  );
};

export default ImageSlider;
