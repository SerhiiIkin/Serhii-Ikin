import type { LegacyRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { classes } from '@utils/classes';

import type { ProjectLayoutProps } from '@modules/ProjectLayoutProps';

const ProjectLayout = (props: ProjectLayoutProps) => {
  const { children, isMore, id, classNameProject } = props;
  const [inViewRef, inView] = useInView({
    threshold: 0.4,
  });
  return isMore ? (
    <Link
      to={`/portfolio/${id}`}
      ref={inViewRef as LegacyRef<HTMLAnchorElement>}
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
      ref={inViewRef as LegacyRef<HTMLDivElement>}
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
