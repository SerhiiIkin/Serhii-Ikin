import { classes } from '@utils/classes';

import type { SectionLayoutProps } from '@modules/SectionLayoutProps';

const SectionLayout = ({
  children,
  className,
  classNameContainer,
}: SectionLayoutProps) => {
  return (
    <section className={classes(['py-3 md:py-5 xl:py-7', className ?? ''])}>
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
