import type { TitleProps } from '@modules/TitleProps';

import { classes } from '@utils/classes';

const Title = ({ typeTitle, className, children }: TitleProps) => {
  switch (typeTitle) {
    case 'h1':
      return (
        <h1
          className={classes([
            'md:text4xl pb-4 text-center text-3xl font-bold text-primaryDarkBlue xl:text-5xl',
            className ?? '',
          ])}
        >
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={classes([
            'pb-4 text-center text-2xl font-bold text-primaryDarkBlue md:text-3xl xl:text-4xl',
            className ?? '',
          ])}
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={classes([
            'pb-4 text-center text-xl font-bold text-primaryDarkBlue md:text-2xl xl:text-3xl',
            className ?? '',
          ])}
        >
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={classes([
            'pb-4 text-center text-lg font-bold text-primaryDarkBlue md:text-xl xl:text-2xl',
            className ?? '',
          ])}
        >
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5
          className={classes([
            'pb-4 text-center text-lg font-bold text-primaryDarkBlue md:text-xl',
            className ?? '',
          ])}
        >
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6
          className={classes([
            'pb-4 text-center text-lg font-bold text-primaryDarkBlue',
            className ?? '',
          ])}
        >
          {children}
        </h6>
      );

    default:
      return (
        <h1
          className={classes([
            'pb-4 text-center text-5xl font-bold text-primaryDarkBlue',
            className ?? '',
          ])}
        >
          {children}
        </h1>
      );
  }
};

export default Title;
