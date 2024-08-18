import Multilanguage from '@utils/Multilanguage';
import { classes } from '@utils/classes';

import type { JobType } from '@modules/JobType';

const Job = (job: JobType) => {
  const description = Multilanguage(job.description);
  return (
    <li
      key={job._id}
      data-date={job.date}
      className={classes([
        'relative w-[calc(50%-30px)] break-words border-b-2 border-dashed border-primaryDarkBlue pb-2 text-primaryDark',
        'even:ml-auto [&_span]:odd:-right-[64px] [&_span]:even:-left-[59px]',
        '[&_p]:odd:pr-2 [&_p]:even:pl-3 [&_p]:odd:md:pr-4 [&_p]:even:md:pl-5 [&_p]:odd:xl:pr-6 [&_p]:even:xl:pl-6',
      ])}
    >
      <span className="absolute top-1/2 max-w-min -translate-y-1/2 rounded-full bg-primaryDarkBlue p-4 text-center text-sm text-primaryLigth">
        {job.date}
      </span>
      <p> {description} </p>
    </li>
  );
};

export default Job;
