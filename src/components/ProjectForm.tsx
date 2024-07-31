import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent, FormEvent, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import type { ProjectType } from '@modules/ProjectType';

import Button from '@components/Button';
import Input from '@components/Input';
import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import SectionLayout from '@components/Layouts/SectionLayout';
import Notification from '@components/Notification';
import Textarea from '@components/Textarea';

import {
  createProjectAxios,
  getSingleProjectOrInitAxios,
  updateImagesAxios,
  updateProjectAxios,
  uploadImagesAxios,
} from '@utils/axios';

const ProjectForm = () => {
  const queryClient = useQueryClient();
  const inputFileRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);
  const [textNotification, setTextNotification] = useState('');

  const { id } = useParams();

  const initialData: ProjectType = {
    images: [],
    title: {
      ukr: '',
      eng: '',
      dk: '',
    },
    link: '',
    description: {
      ukr: '',
      eng: '',
      dk: '',
    },
    isFavorite: false,
  };

  const {
    isPending,
    error,
    data: currentProject,
  } = useQuery({
    queryKey: ['editproject'],
    queryFn: async () =>
      getSingleProjectOrInitAxios({
        id: id ?? '',
        initialData,
      }),
    initialData: initialData,
  });

  const [data, setData] = useState<ProjectType>(initialData);

  const createProjectMutation = useMutation({
    mutationKey: ['project'],
    mutationFn: async (data: ProjectType) => createProjectAxios(data),
    onSuccess: () => {
      resetHandler();

      setTextNotification('Проєкт успішно створено');

      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  const updateProjectMutation = useMutation({
    mutationKey: ['project'],
    mutationFn: async (data: ProjectType) =>
      updateProjectAxios({ id: id ?? '', data }),
    onSuccess: data => {
      setData(data);
      setImages(null);

      setTextNotification('Проєкт успішно оновленно');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['projects', id] });
      }, 3000);
    },
  });

  const submitHander = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Array.isArray(data.images) && data.images.length > 0) {
      id
        ? updateProjectMutation.mutate(data)
        : createProjectMutation.mutate(data);
      setTextNotification('Завантаження  на сервер');
    } else {
      setTextNotification('Забув загрузити картинки на сервер');
    }
  };

  const dataHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, placeholder } = event.target;
    if (placeholder.includes('title')) {
      setData(prevData => ({
        ...prevData,
        title: {
          ...prevData.title,

          [name]: value,
        },
      }));
    } else if (placeholder.includes('description')) {
      setData(prevData => ({
        ...prevData,
        description: {
          ...prevData.description,

          [name]: value,
        },
      }));
    } else if (name.includes('isFavorite')) {
      setData(prevData => ({
        ...prevData,
        [name]: (event.target as HTMLInputElement)?.checked,
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files);
    setPreviewImages([]);

    const uploadImage = (file: File) => {
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/webp' ||
        file.type === 'image/svg+xml'
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImages([]);
      }
    };

    Array.from(event.target.files || []).forEach(e => {
      uploadImage(e);
    });
  };

  const uploadImages = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    if (images?.length === 0) {
      setTextNotification('Забув загрузити картинки');
      return;
    }

    if (images) {
      for (let i = 0; i < images?.length; i++) {
        formData.append('images', images[i]);
      }
    }

    if (!data.title.eng) {
      setTextNotification('Забув прописати titleENG');
      return;
    }

    formData.append('title', data.title.eng);
    handleImages(formData);
  };

  const handleImages = async (formData: FormData) => {
    try {
      const response = id
        ? await uploadImagesAxios(formData)
        : await updateImagesAxios(formData);
      setTextNotification(
        id ? 'Картинки оновленно на сервері' : 'Картинки завантажено на сервер'
      );

      setData(prevData => ({
        ...prevData,
        images: response.data.uploadedFiles,
      }));
    } catch (error) {
      console.error(error);
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = 'somethink went wrong';
      }

      setTextNotification(message as string);
    }
  };

  const resetHandler = () => {
    setData(initialData);
    setImages(null);
    setPreviewImages([]);
    if (inputFileRef?.current !== null) {
      inputFileRef.current.value = '';
    }
  };

  useEffect(() => {
    if (currentProject) {
      setData(currentProject);
    }
  }, [currentProject]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['editProject'] });
  }, [id, queryClient]);

  return (
    <>
      <SectionLayout>
        <form onSubmit={uploadImages} className="pb-4">
          <input
            ref={inputFileRef}
            className="mb-2 mr-2"
            type="file"
            onChange={imageHandler}
            name="images"
            multiple
          />
          <Button type="submit">Upload image</Button>
          <Button
            type="reset"
            onClick={resetHandler}
            className="ml-2 bg-secondaryRed"
          >
            Reset
          </Button>
        </form>
        <h3 className="pb-4">Preview images</h3>
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-4 pb-4">
            {previewImages.map((image, index) => (
              <img key={index} src={image} width={300} height={200} alt={''} />
            ))}
          </div>
        )}
        <FetchDataHandler
          data={{
            data: currentProject,
            error: error?.message as string,
            isLoading: isPending,
          }}
        >
          {currentProject && <h3 className="pb-4">Current images</h3>}
          {currentProject && (
            <div className="flex flex-wrap gap-4 pb-4">
              {Array.isArray(data?.images) &&
                data?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.fileUrl}
                    width={300}
                    height={200}
                    alt={data?.title.eng}
                  />
                ))}
            </div>
          )}
        </FetchDataHandler>
        <form onSubmit={submitHander} className="grid grid-cols-1 gap-4 pb-4">
          <Input
            type="text"
            name="ukr"
            className=""
            placeholder="title ukr"
            value={data?.title?.ukr || ''}
            onChange={dataHandler}
          />

          <Input
            type="text"
            required
            name="eng"
            className=""
            placeholder="title eng"
            value={data?.title?.eng || ''}
            onChange={dataHandler}
          />
          <Input
            type="text"
            name="dk"
            className=""
            placeholder="title dk"
            value={data?.title?.dk || ''}
            onChange={dataHandler}
          />
          <Textarea
            name="ukr"
            placeholder="descriptionUKR"
            value={data?.description?.ukr || ''}
            onChange={dataHandler}
          />
          <Textarea
            name="eng"
            placeholder="descriptionENG"
            value={data?.description?.eng || ''}
            onChange={dataHandler}
          />
          <Textarea
            name="dk"
            placeholder="descriptionDK"
            value={data?.description?.dk || ''}
            onChange={dataHandler}
          />
          <Input
            type="text"
            name="link"
            className=""
            placeholder="link"
            value={data?.link || ''}
            onChange={dataHandler}
          />
          <label
            htmlFor="isFavorite"
            className="[&_svg]:h-10 [&_svg]:w-10 [&_svg]:cursor-pointer [&_svg]:fill-primaryDarkBlue [&_svg]:has-[:checked]:fill-primaryOrange"
          >
            <FaStar />
            <Input
              type="checkbox"
              name="isFavorite"
              id="isFavorite"
              className="hidden"
              placeholder=""
              checked={data?.isFavorite}
              onChange={dataHandler}
            />
          </label>

          <div>
            <Button className="bg-primaryDarkBlue" type="submit">
              Submit
            </Button>
            <Button
              type="reset"
              className="ml-2 bg-secondaryRed"
              onClick={resetHandler}
            >
              Reset
            </Button>
          </div>
        </form>
      </SectionLayout>
      <Notification textNotification={textNotification} />
    </>
  );
};

export default ProjectForm;
