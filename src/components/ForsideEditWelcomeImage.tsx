import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, RefObject } from 'react';

import Button from '@components/Button';
import { ToastContext } from '@components/Context/ToastContext';
import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

import { getImagesAxios, updateImagesAxios } from '@utils/axios';

const ForsideEditWelcomeImage = () => {
  const toast = useContext(ToastContext);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);
  const [imagesBucket, setImagesBucket] = useState<string[]>([]);
  const inputFileRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const folderName = 'welcome-images';

  const getImagesWelcomeMutation = useMutation({
    mutationFn: (folderName: string) => getImagesAxios(folderName),
    onSuccess: data => {
      setImagesBucket(data);
    },
  });

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

  const uploadImages = async () => {
    const formData = new FormData();

    if (images?.length === 0 || images?.length === undefined) {
      toast.error('Забув загрузити картинки');
      return;
    }

    if (images) {
      for (let i = 0; i < images?.length; i++) {
        formData.append('images', images[i]);
      }
    }

    formData.append('title', folderName);
    const uploadedFiles = await handleImages(formData);
    return uploadedFiles;
  };

  const handleImages = async (formData: FormData) => {
    try {
      const response = await updateImagesAxios(formData);
      toast.success('Картинки оновленно на сервері');

      return response.data.uploadedFiles;
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

      toast.error(message as string);
    }
  };

  const resetHandler = () => {
    setImages(null);
    setPreviewImages([]);
    if (inputFileRef?.current !== null) {
      inputFileRef.current.value = '';
    }
  };

  useEffect(() => {
    getImagesWelcomeMutation.mutate(folderName);
  }, [getImagesWelcomeMutation]);

  return (
    <SectionLayout>
      <form className="pb-4">
        <input
          ref={inputFileRef}
          className="mb-2 mr-2"
          type="file"
          onChange={imageHandler}
          name="images"
          multiple
        />
        <Button type="button" onClick={uploadImages}>
          Upload image
        </Button>
        <Button
          type="reset"
          onClick={resetHandler}
          className="ml-2 bg-secondaryRed"
        >
          Reset
        </Button>
      </form>
      <Title typeTitle="h3"> Prewiview images </Title>
      <table>
        <thead>
          <tr>
            {images &&
              Array.from(images).map((image, index) => (
                <th key={index}> {image.name} </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {previewImages.length > 0 && (
            <tr>
              {previewImages.map((image, index) => (
                <td key={index} className="p-2">
                  <img
                    key={index}
                    src={image}
                    width={200}
                    height={100}
                    alt={''}
                  />
                </td>
              ))}
            </tr>
          )}
          <tr>
            <Title typeTitle="h3"> Bucket images </Title>
          </tr>

          {imagesBucket.length > 0 && (
            <tr>
              {imagesBucket.map((image, index) => (
                <td key={index} className="p-2">
                  <img
                    key={index}
                    src={image}
                    width={200}
                    height={100}
                    alt={''}
                  />
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </SectionLayout>
  );
};

export default ForsideEditWelcomeImage;
