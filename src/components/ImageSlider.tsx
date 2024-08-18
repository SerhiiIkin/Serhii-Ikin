import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import Button from '@components/Button';

import { classes } from '@utils/classes';

import type { ImageSliderTypes } from '@modules/ImageSliderTypes';

const ImageSlider = ({
  images,
  intervalTime = 7000,
  imageClasses,
  imageContainerClasses,
  isSlider,
}: ImageSliderTypes) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images?.length);
    }, intervalTime);
  }, [images?.length, intervalTime]);

  const clearIntervalFunction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const restartInterval = () => {
    clearIntervalFunction();
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      clearIntervalFunction();
    };
  }, [intervalTime, startInterval]);

  const onBtnSliderClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const btn =
      event.target instanceof HTMLButtonElement
        ? (event.target as HTMLButtonElement)
        : (event.target as Element).closest('button');

    if (btn && btn.dataset.value === 'btnRigth') {
      restartInterval();
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images?.length);
    } else {
      restartInterval();
      setCurrentImageIndex(
        prevIndex => (prevIndex - 1 + images?.length) % images?.length
      );
    }
  };

  return (
    <>
      {images?.length > 1 && isSlider ? (
        <article
          className={classes([
            'group relative flex overflow-hidden',
            imageContainerClasses ? imageContainerClasses : '',
          ])}
        >
          {images.map((image, index) => (
            <img
              className={classes([
                'order-1 max-h-[40dvh] min-w-full object-contain opacity-0 duration-[4s]',
                index === currentImageIndex
                  ? 'opacity-1 order-0 duration-[4s]'
                  : '',
                imageClasses ? imageClasses : '',
              ])}
              key={index}
              src={image}
              loading="lazy"
              alt="product"
            />
          ))}
          <Button
            aria-label="next image"
            type="button"
            data-value="btnRigth"
            onClick={onBtnSliderClick}
            className={classes([
              'absolute right-2 top-1/2 -translate-y-1/2 translate-x-1/2',
              'xl:opacity-0 xl:duration-1000',
              'group-hover:translate-x-0 group-hover:opacity-100',
            ])}
          >
            <FaArrowAltCircleRight />
          </Button>
          <Button
            aria-label="previous image"
            type="button"
            data-value="btnLeft"
            onClick={onBtnSliderClick}
            className={classes([
              'absolute left-2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180',
              'xl:opacity-0 xl:duration-1000',
              'group-hover:translate-x-0 group-hover:opacity-100',
            ])}
          >
            <FaArrowAltCircleRight />
          </Button>
        </article>
      ) : (
        <img
          className={classes([
            'opacity-1 max-h-[40dvh] min-w-full object-contain duration-[4s]',
            imageClasses ? imageClasses : '',
          ])}
          key={images[0]}
          src={images[0]}
          loading="lazy"
          alt="product"
        />
      )}
    </>
  );
};

export default ImageSlider;
