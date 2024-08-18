import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { classes } from '@utils/classes';

import type { ProjectContextType } from '@modules/ProjectContextType';

const ProjectLayout = ({
  children,
  isMore,
  id,
  classNameProject,
}: {
  children: JSX.Element;
  isMore: boolean;
  id: string;
  classNameProject?: ProjectContextType['classNameProject'];
}) => {
  const [inViewRef, inView] = useInView({
    threshold: 0,
  });
  return isMore ? (
    <Link
      to={`/portfolio/${id}`}
      ref={inViewRef}
      className={classes([
        'group flex flex-col gap-2 rounded p-2 shadow-2xl shadow-primaryDarkBlue duration-1000',
        'xl:hover:bg-primaryOrange xl:hover:shadow-2xl xl:hover:shadow-primaryOrange',
        inView
          ? 'md:translate-x-0 md:opacity-100 md:duration-1000'
          : 'even:-translate-x-6 md:translate-x-6 md:opacity-0 md:duration-1000 md:motion-reduce:translate-x-0',
        classNameProject?.content ?? '',
      ])}
    >
      {children}
    </Link>
  ) : (
    <div
      ref={inViewRef}
      className={classes([
        'flex flex-col gap-2',
        inView
          ? 'md:translate-x-0 md:opacity-100 md:duration-1000'
          : 'even:-translate-x-6 md:translate-x-6 md:opacity-0 md:duration-1000 md:motion-reduce:translate-x-0',
        classNameProject?.content ?? '',
      ])}
    >
      {children}
    </div>
  );
};

export default ProjectLayout;
