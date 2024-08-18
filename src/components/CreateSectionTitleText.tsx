import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import SectionLayout from '@layouts/SectionLayout';

import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Textarea from '@components/Textarea';
import Title from '@components/Title';

import {
  createSectionTitleTextAxios,
  updateSectionTitleTextAxios,
} from '@utils/axios';

import type { SectionTitleDesciptionType } from '@modules/textType';

const CreateSectionTitleText = ({
  data,
}: {
  data: SectionTitleDesciptionType;
}) => {
  const queryClient = useQueryClient();
  const initialData = {
    title: {
      ukr: '',
      eng: '',
      dk: '',
    },

    description: {
      ukr: '',
      eng: '',
      dk: '',
    },
    key: '',
  };
  const [formData, setFormData] =
    useState<SectionTitleDesciptionType>(initialData);
  const toast = useContext(ToastContext);
  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'key':
        setFormData(prev => ({ ...prev, key: value }));
        break;
      case 'title-ukr':
        setFormData(prev => ({
          ...prev,
          title: { ...prev.title, ukr: value },
        }));
        break;
      case 'title-eng':
        setFormData(prev => ({
          ...prev,
          title: { ...prev.title, eng: value },
        }));
        break;
      case 'title-dk':
        setFormData(prev => ({
          ...prev,
          title: { ...prev.title, dk: value },
        }));
        break;
      case 'description-ukr':
        setFormData(prev => ({
          ...prev,
          description: { ...prev.description, ukr: value },
        }));
        break;
      case 'description-eng':
        setFormData(prev => ({
          ...prev,
          description: { ...prev.description, eng: value },
        }));
        break;
      case 'description-dk':
        setFormData(prev => ({
          ...prev,
          description: { ...prev.description, dk: value },
        }));
        break;
    }
  };

  const createSectionTitleTextMutation = useMutation({
    mutationKey: ['section-title-description'],
    mutationFn: async () => await createSectionTitleTextAxios(formData),
    onSuccess: () => {
      setFormData(initialData);
      toast.success('SectionTitleText created');
      queryClient.invalidateQueries({
        queryKey: ['section-title-description'],
      });
    },
    onError: () => toast.error('Error creating SectionTitleText'),
  });

  const updateSectionTitleTextMutation = useMutation({
    mutationKey: ['section-title-description'],
    mutationFn: () => updateSectionTitleTextAxios(formData),
    onSuccess: () => {
      setFormData(initialData);
      toast.success('SectionTitleText updated');
      queryClient.invalidateQueries({
        queryKey: ['section-title-description'],
      });
    },
    onError: () => toast.error('Error updating SectionTitleText'),
  });

  const handler = () => {
    data.key
      ? updateSectionTitleTextMutation.mutate()
      : createSectionTitleTextMutation.mutate();
  };

  useEffect(() => {
    data.key && setFormData(data);
  }, [data]);

  return (
    <SectionLayout classNameContainer="grid gap-2">
      <Title typeTitle="h3" className="text-left">
        Section Title Description Create
      </Title>
      <Textarea
        placeholder="key"
        name="key"
        onChange={changeHandler}
        value={formData.key}
      />
      <Textarea
        placeholder="title-ukr"
        value={formData.title.ukr}
        name="title-ukr"
        onChange={changeHandler}
      />
      <Textarea
        placeholder="title-eng"
        value={formData.title.eng}
        name="title-eng"
        onChange={changeHandler}
      />
      <Textarea
        placeholder="title-dk"
        value={formData.title.dk}
        name="title-dk"
        onChange={changeHandler}
      />
      <Textarea
        placeholder="description-ukr"
        value={formData.description.ukr}
        name="description-ukr"
        onChange={changeHandler}
      />
      <Textarea
        placeholder="description-eng"
        value={formData.description.eng}
        name="description-eng"
        onChange={changeHandler}
      />
      <Textarea
        placeholder="description-dk"
        value={formData.description.dk}
        name="description-dk"
        onChange={changeHandler}
      />
      <div>
        <Button type="button" onClick={handler} className="place-self-start">
          {data.key ? 'Update' : 'Create'}
        </Button>
        <Button
          type="reset"
          onClick={() => setFormData(initialData)}
          className="ml-2 place-self-start bg-secondaryRed"
        >
          Reset
        </Button>
      </div>
    </SectionLayout>
  );
};

export default CreateSectionTitleText;
