import { classes } from '@utils/classes';

import type { ImageProps } from '@modules/ImageProps';

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
          width={300}
          height={400}
          media="(min-width: 1280px)"
        />
        <source
          srcSet={srcMD}
          width={300}
          height={400}
          media="(min-width: 640px)"
        />
        <img
          className={classes([classNameImg ?? ''])}
          src={srcSM}
          width={200}
          height={300}
          alt="autor photo"
        />
      </picture>
    </figure>
  );
};

export default Image;
