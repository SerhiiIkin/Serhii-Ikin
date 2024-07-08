import type { SectionLayoutProps } from '@modules/SectionLayoutProps';

import { classes } from '@utils/classes';

const SectionLayout = ({
  children,
  className,
  classNameContainer,
}: SectionLayoutProps) => {
  return (
    <section className={classes(['py-5 md:py-7 xl:py-10', className ?? ''])}>
      <div
        className={classes([
          'container mx-auto px-2 md:px-4 xl:px-8',
          classNameContainer ?? '',
        ])}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
