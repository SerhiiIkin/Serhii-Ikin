import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type ChangeEvent, type FormEvent, useContext, useState } from 'react';

import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Input from '@components/Input';
import Textarea from '@components/Textarea';

import { createJobAxios } from '@utils/axios';

const FormCreateJob = () => {
  const queryClient = useQueryClient();

  const toast = useContext(ToastContext);
  const initialData = {
    date: '',
    description: {
      ukr: '',
      eng: '',
      dk: '',
    },
  };

  const [formData, setFormData] = useState(initialData);
  const dataHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'date') {
      setFormData(prev => ({
        ...prev,
        date: value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        description: {
          ...prev.description,
          [name]: value,
        },
      }));
    }
  };

  const createJobMutation = useMutation({
    mutationFn: createJobAxios,
    onSuccess: () => {
      setFormData(initialData);
      toast.success('Job created');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: () => toast.error('Error creating Job'),
  });

  const submitHander = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createJobMutation.mutate(formData);
  };

  const resetFrom = () => setFormData(initialData);

  return (
    <form onSubmit={submitHander} className="grid gap-2">
      <Input
        placeholder="1999 - 2000"
        onChange={dataHandler}
        value={formData.date}
        name="date"
      />
      <Textarea
        placeholder="descrption ukr"
        name="ukr"
        onChange={dataHandler}
        value={formData.description.ukr}
      />
      <Textarea
        placeholder="descrption eng"
        name="eng"
        onChange={dataHandler}
        value={formData.description.eng}
      />
      <Textarea
        placeholder="descrption dk"
        name="dk"
        onChange={dataHandler}
        value={formData.description.dk}
      />
      <div className="flex gap-2">
        <Button type="submit">Create</Button>
        <Button onClick={resetFrom} className="bg-secondaryRed" type="reset">
          Reset
        </Button>
      </div>
    </form>
  );
};

export default FormCreateJob;
