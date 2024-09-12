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
        'relative w-[calc(100%-60px)] break-words border-b-2 border-dashed border-primaryDarkBlue text-primaryDark sm:w-[calc(50%-30px)]',
        'sm:even:ml-auto sm:[&_span]:even:-left-[60px]',
        '[&_p]:odd:pr-2 [&_p]:sm:even:pl-3 [&_p]:odd:md:pr-4 [&_p]:even:md:pl-5 [&_p]:odd:xl:pr-6 [&_p]:even:xl:pl-6',
      ])}
    >
      <span className="absolute -right-[60px] max-w-min rounded-full bg-primaryDarkBlue p-4 text-center text-sm text-primaryLigth">
        {job.date}
      </span>
      <p> {description} </p>
    </li>
  );
};

export default Job;
