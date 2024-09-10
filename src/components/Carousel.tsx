import { FaArrowAltCircleRight } from 'react-icons/fa';

import { useCarousel } from '../hooks/useCarousel';

import Button from '@components/Button';

import { classes } from '@utils/classes';

import type { CarouselProps } from '@modules/CarouselProps';

const Carousel = (props: CarouselProps) => {
  const {
    startDrag,
    drag,
    stopDrag,
    containerRef,
    wrapperRef,
    slideRef,
    currentTransformX,
    translate,
    transition,
    currentData,
    changeSlide,
  } = useCarousel({ ...props });

  const { spaceBetween, draggable } = props;

  return (
    <div
      onClick={e => e.preventDefault()}
      aria-label="carousel"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onMouseMove={drag}
      onTouchMove={drag}
      onMouseUp={stopDrag}
      onTouchEnd={stopDrag}
    >
      <div
        ref={containerRef}
        aria-label="container"
        className={classes([
          'group container relative mx-auto min-h-[40dvh] overflow-hidden',
          draggable ? 'cursor-grab' : '',
        ])}
      >
        <div
          ref={wrapperRef}
          aria-label="wrapper"
          className={classes([
            'perspective-1200 transform-style absolute left-0 top-0 flex h-full w-full',
            draggable ? 'pointer-events-none' : '',
          ])}
          style={{
            transform: `translate3d(${currentTransformX}px, 0, 0)`,
            transitionDuration: `${transition}ms`,
            translate: `${translate}px`,
          }}
        >
          {currentData?.map((image, i) => {
            return (
              <div
                data-index={i}
                ref={slideRef}
                aria-label="slide"
                className="flex-shrink-0 flex-grow-0 basis-full"
                style={{
                  marginRight: `${spaceBetween}px`,
                }}
                key={i}
              >
                <img
                  className="mx-auto h-full"
                  src={image}
                  alt="image"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        <Button
          onClick={e => changeSlide('left', e)}
          type="button"
          aria-label="left"
          className={classes([
            'absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 bg-transparent xl:left-2',
            'xl:opacity-0 xl:duration-1000',
            'xl:hover:bg-transparent xl:group-hover:translate-x-0 xl:group-hover:opacity-100',
          ])}
        >
          <FaArrowAltCircleRight className="h-10 w-10 fill-primaryOrange xl:hover:fill-primaryDarkBlue" />
        </Button>
        <Button
          onClick={e => changeSlide('right', e)}
          type="button"
          aria-label="right"
          className={classes([
            'absolute right-6 top-1/2 -translate-y-1/2 translate-x-1/2 bg-transparent xl:right-2',
            'xl:opacity-0 xl:duration-1000',
            'xl:hover:bg-transparent xl:group-hover:translate-x-0 xl:group-hover:opacity-100',
          ])}
        >
          <FaArrowAltCircleRight className="h-10 w-10 fill-primaryOrange xl:hover:fill-primaryDarkBlue" />
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
