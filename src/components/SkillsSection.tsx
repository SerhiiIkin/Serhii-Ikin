import { useQuery } from '@tanstack/react-query';

import FetchDataHandler from '@layouts/FetchDataHandler';

import Button from '@components/Button';

import { getSkillsAxios } from '@utils/axios';

import type { skillsListGroupType } from '@modules/skillsListGroupType';

const SkillsSection = ({
  isEdit,
  updateSkill,
}: {
  isEdit?: boolean;
  updateSkill?: (skill: skillsListGroupType) => void;
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkillsAxios,
  });

  return (
    <FetchDataHandler
      data={{ data, error: error?.message ? error.message : '', isLoading }}
    >
      {data?.map((skill: skillsListGroupType) => (
        <ul key={skill._id} className="md:row-start-3">
          <li className="text-md text-primaryDarkBlue md:text-xl xl:text-2xl">
            {skill.title}:
          </li>
          {skill.list.map((item, index) => (
            <li
              key={index}
              className="list-['*'] pl-4 text-primaryDark marker:text-primaryDarkBlue"
            >
              <b>{item.subtitle}</b> {item.skills.join(', ')}
            </li>
          ))}
          {isEdit && (
            <Button onClick={() => updateSkill && updateSkill(skill)}>
              Edit
            </Button>
          )}
        </ul>
      ))}
    </FetchDataHandler>
  );
};

export default SkillsSection;
