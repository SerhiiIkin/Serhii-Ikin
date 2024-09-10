import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import type { ChangeEvent } from 'react';

import SectionLayout from '@layouts/SectionLayout';

import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Input from '@components/Input';
import SkillsSection from '@components/SkillsSection';
import Title from '@components/Title';

import { createSkillAxios, updageSkillAxios } from '@utils/axios';

import type { skillsListGroupType } from '@modules/skillsListGroupType';

const EditForsideSkills = () => {
  const toast = useContext(ToastContext);
  const queryClient = useQueryClient();
  const initalData: skillsListGroupType = {
    title: '',
    list: [
      {
        subtitle: '',
        skills: [],
      },
    ],
  };

  const [data, setData] = useState<skillsListGroupType>(initalData);

  const dataHandler = (
    index: number,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case 'subtitle':
        setData(prev => ({
          ...prev,
          list: prev.list.map((item, i) => {
            if (i === index) {
              return { ...item, subtitle: value };
            }
            return item;
          }),
        }));
        break;
      case 'skills':
        setData(prev => ({
          ...prev,
          list: prev.list.map((item, i) => {
            if (i === index) {
              return { ...item, skills: value.split(',') };
            }
            return item;
          }),
        }));
        break;
    }
  };

  const addSubtitleAndSkills = () => {
    setData(prev => ({
      ...prev,
      list: [...prev.list, { subtitle: '', skills: [] }],
    }));
  };

  const updateSkillMutation = useMutation({
    mutationKey: ['skills'],
    mutationFn: (data: skillsListGroupType) => updageSkillAxios(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill was updated successfully');
      setData(initalData);
    },
  });

  const handleSkill = async () => {
    if (data._id) {
      updateSkillMutation.mutate(data);
      return;
    }
    const response = await createSkillAxios(data);
    if (response.data) {
      setData(initalData);
      toast.success('Skill was created successfully');
    }
  };

  const updateSkill = (skill: skillsListGroupType) => {
    setData(skill);
  };

  return (
    <>
      <SectionLayout classNameContainer="grid grid-cols-1 gap-4">
        <Title typeTitle="h3">Create Forside Skills</Title>
        <Input
          onChange={event =>
            setData(prev => {
              return { ...prev, title: event.target.value };
            })
          }
          type="text"
          name="title"
          value={data.title}
          placeholder="title"
        />
        {data.list.map((item, index) => (
          <div key={index} className="flex flex-wrap gap-2">
            <Input
              onChange={event => dataHandler(index, event)}
              type="text"
              name="subtitle"
              placeholder="subtitle"
              className="basis-1/3"
              value={item.subtitle}
            />
            <Input
              onChange={event => dataHandler(index, event)}
              placeholder="skills"
              name="skills"
              className="basis-2/3"
              value={item.skills}
            />
            <Button type="button" onClick={addSubtitleAndSkills}>
              +
            </Button>
          </div>
        ))}

        <Button onClick={handleSkill} type="button">
          {data._id ? 'Update' : 'Create'}
        </Button>
        <Button
          className="bg-secondaryRed"
          onClick={() => setData(initalData)}
          type="reset"
        >
          Reset
        </Button>
      </SectionLayout>
      <SectionLayout>
        <Title typeTitle="h3">Edit Forside Skills</Title>
        <SkillsSection isEdit updateSkill={updateSkill} />
      </SectionLayout>
    </>
  );
};

export default EditForsideSkills;
