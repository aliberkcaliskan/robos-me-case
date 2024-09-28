'use client';

import Button from '@/components/button';
import { ButtonTypeEnum } from '@/components/button/enum';
import InputComponent from '@/components/forms/inputs/input';
import TextareaComponent from '@/components/forms/inputs/textarea';
import { ROUTES } from '@/constants/routes';
import usePostStore from '@/stores/slices/list';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import style from './style.module.scss';

const schema = z.object({
  title: z
    .string()
    .min(3, 'Başlık en az 3 karakter olmalıdır')
    .max(50, 'Başlık en fazla 50 karakter olabilir')
    .nonempty('Başlık zorunludur'),
  body: z
    .string()
    .min(10, 'İçerik en az 10 karakter olmalıdır')
    .max(500, 'İçerik en fazla 500 karakter olabilir')
    .nonempty('İçerik zorunludur'),
});

// Zod şemasından otomatik tip çıkarımı
type FormData = z.infer<typeof schema>;

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { selectedPost, loadPostById, updatePost, isLoading, errorMessage } = usePostStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (typeof id === 'string') {
      loadPostById(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedPost) {
      setValue('title', selectedPost.title);
      setValue('body', selectedPost.body);
    }
  }, [selectedPost, setValue]);

  const onSubmit = async (data: FormData) => {
    if (typeof id === 'string') {
      await updatePost(id, data);
      setIsEditing(false);
      toast.success('Başarıyla kaydedildi! yönlendirileceksiniz...');
      setTimeout(() => {
        router.push(ROUTES.LIST);
      }, 2000);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.detailContainer}>
        <ToastContainer />
        {isLoading ? (
          <p>Yükleniyor...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : selectedPost ? (
          <div>
            <h2>{selectedPost.id}</h2>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formGroup}>
                  <Controller
                    name='title'
                    control={control}
                    render={({ field }) => (
                      <InputComponent
                        control={control}
                        placeholder='Başlık'
                        label='Başlık'
                        error={errors.title}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className={style.formGroup}>
                  <Controller
                    name='body'
                    control={control}
                    render={({ field }) => (
                      <TextareaComponent
                        control={control}
                        placeholder='İçerik'
                        label='İçerik'
                        error={errors.body}
                        {...field}
                      />
                    )}
                  />
                </div>
                <Button buttonType='submit'>Kaydet</Button>
                <Button type={ButtonTypeEnum.SECONDARY} onClick={() => setIsEditing(false)}>
                  İptal
                </Button>
              </form>
            ) : (
              <div>
                <h3>{selectedPost.title}</h3>
                <p>{selectedPost.body}</p>
                <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
                <Button type={ButtonTypeEnum.SECONDARY} onClick={() => router.push(ROUTES.LIST)}>
                  Geri Dön
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p>Post bulunamadı.</p>
        )}
      </div>{' '}
    </div>
  );
};

export default DetailPage;
