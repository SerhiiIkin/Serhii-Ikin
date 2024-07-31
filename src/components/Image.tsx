import type { ImageProps } from '@modules/ImageProps';

import { classes } from '@utils/classes';

const Image = ({
  figcaption,
  srcSM,
  srcMD,
  srcXL,
  classNameFigure,
  classNamePicture,
  classNameImg,
  classNameFigCaption,
}: ImageProps) => {
  return (
    <figure className={classes([classNameFigure ?? ''])}>
      <figcaption className={classes([classNameFigCaption ?? ''])}>
        {figcaption}
      </figcaption>
      <picture tabIndex={0} className={classes([classNamePicture ?? ''])}>
        <source
          srcSet={srcXL}
          media="(min-width: 1280px)"
          width={500}
          height={756}
        />
        <source
          srcSet={srcMD}
          media="(min-width: 640px)"
          width={400}
          height={605}
        />
        <img
          className={classes([classNameImg ?? ''])}
          src={srcSM}
          alt="autor photo"
          loading="lazy"
          width={300}
          height={454}
        />
      </picture>
    </figure>
  );
};

export default Image;
