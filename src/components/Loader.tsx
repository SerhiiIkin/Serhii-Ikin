import type { LoaderProps } from '@modules/LoaderProps';

import { classes } from '@utils/classes';

const Loader = ({ size, className }: LoaderProps) => {
  const clases =
    size === 'small'
      ? 'w-5 h-5 [&_div]:after:top-[22px] [&_div]:after:w-0.5 [&_div]:after:h-3'
      : size === 'large'
        ? 'w-10 h-10 [&_div]:after:top-2.5 [&_div]:after:w-1 [&_div]:after:h-5'
        : 'w-7 h-7 [&_div]:after:top-4 [&_div]:after:w-0.5 [&_div]:after:h-4';

  const divsData = [
    {
      style: { animationDelay: '-1.1s' },
      className: 'rotate-0 after:bg-green-500',
    },
    {
      style: { animationDelay: '-1s' },
      className: 'rotate-[30deg] after:bg-red-500',
    },
    {
      style: { animationDelay: '-0.9s' },
      className: 'rotate-[60deg] after:bg-blue-500',
    },
    {
      style: { animationDelay: '-0.8s' },
      className: 'rotate-[90deg] after:bg-orange-500',
    },
    {
      style: { animationDelay: '-0.7s' },
      className: 'rotate-[120deg] after:bg-purple-500',
    },
    {
      style: { animationDelay: '-0.6s' },
      className: 'rotate-[150deg] after:bg-yellow-500',
    },
    {
      style: { animationDelay: '-0.5s' },
      className: 'rotate-[180deg] after:bg-pink-500',
    },
    {
      style: { animationDelay: '-0.4s' },
      className: 'rotate-[210deg] after:bg-brown-500',
    },
    {
      style: { animationDelay: '-0.3s' },
      className: 'rotate-[240deg] after:bg-green-500',
    },
    {
      style: { animationDelay: '-0.2s' },
      className: 'rotate-[270deg] after:bg-red-500',
    },
    {
      style: { animationDelay: '-0.1s' },
      className: 'rotate-[300deg] after:bg-blue-500',
    },
    {
      style: { animationDelay: '0s' },
      className: 'rotate-[330deg] after:bg-orange-500',
    },
  ];

  return (
    <div
      className={classes([
        'relative mb-10',
        '[&_div]:origin-[40px_40px] [&_div]:animate-lds-spinner',
        "[&_div]:after:absolute [&_div]:after:left-[36.8px] [&_div]:after:animate-lds-spinner [&_div]:after:rounded-2xl [&_div]:after:content-['']",
        clases,
        className ?? '',
      ])}
    >
      {divsData.map(({ style, className }, index) => (
        <div
          key={index}
          style={{ animationDelay: style.animationDelay }}
          className={className}
        ></div>
      ))}
    </div>
  );
};

export default Loader;
