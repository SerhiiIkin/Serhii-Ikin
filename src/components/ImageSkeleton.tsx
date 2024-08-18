import { classes } from '@utils/classes';

const ImageSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={classes([
        'min-h-[454px] min-w-[300px] animate-pulse rounded-xl bg-secondaryDarkGrey',
        className ?? '',
      ])}
    ></div>
  );
};

export default ImageSkeleton;
