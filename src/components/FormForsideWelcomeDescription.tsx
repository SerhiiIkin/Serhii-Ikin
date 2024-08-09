import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import type { ChangeEvent } from 'react';

import Button from '@components/Button';
import { ToastContext } from '@components/Context/ToastContext';
import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import Textarea from '@components/Textarea';
import Title from '@components/Title';

import {
  getForsideWelcomeDescription,
  updateForsideWelcomeDescription,
} from '@utils/axios';

const FormForsideWelcomeDescription = () => {
  const toast = useContext(ToastContext);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    ukr: '',
    eng: '',
    dk: '',
  });

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateForsideWelcomeDescriptionMutation = useMutation({
    mutationKey: ['forside-welcome-description'],
    mutationFn: async () => await updateForsideWelcomeDescription(formData),
    onSuccess: () => {
      toast.success('Description updated');
      queryClient.invalidateQueries({
        queryKey: ['forside-welcome-description'],
      });
    },
    onError: () => toast.error('Error updating description'),
  });

  const updateDescription = async () => {
    updateForsideWelcomeDescriptionMutation.mutate();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['forside-welcome-description'],
    queryFn: async () => {
      const responseData = await getForsideWelcomeDescription();
      setFormData(responseData);
      return responseData;
    },
  });

  return (
    <form className="flex flex-col gap-2">
      <Title typeTitle="h3" className="text-left">
        Description forside
      </Title>
      <FetchDataHandler
        data={{
          data,
          error: error?.message ?? '',
          isLoading,
        }}
      >
        <ul>
          <li> {data.ukr} </li>
          <li> {data.eng} </li>
          <li> {data.dk} </li>
        </ul>
      </FetchDataHandler>
      <Textarea
        placeholder="ukr"
        value={formData.ukr}
        name="ukr"
        onChange={changeHandler}
      />
      <Textarea
        placeholder="eng"
        value={formData.eng}
        name="eng"
        onChange={changeHandler}
      />
      <Textarea
        placeholder="dk"
        value={formData.dk}
        name="dk"
        onChange={changeHandler}
      />
      <Button type="button" onClick={updateDescription} className="self-start">
        Update
      </Button>
    </form>
  );
};

export default FormForsideWelcomeDescription;
