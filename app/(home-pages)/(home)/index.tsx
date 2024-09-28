'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useUserStore from '@/stores/slices/user';
import InputComponent from '@/components/forms/inputs/input';
import Button from '@/components/button';
import style from './style.module.scss';
import { ROUTES } from '@/constants/routes';

// Zod şeması
const loginSchema = z.object({
  companyCode: z.string().nonempty('Şirket Kodu zorunludur').max(6, 'Şirket Kodu en fazla 6 karakter olmalıdır'),
  region: z.string().nonempty('Bölge zorunludur'),
  email: z.string().email('Geçersiz e-posta adresi').nonempty('E-posta zorunludur'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır').nonempty('Şifre zorunludur'),
});

// Zod şemasından otomatik tip çıkarımı
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { setUser } = useUserStore();

  const onSubmit = (data: LoginFormInputs) => {
    setUser({
      companyCode: data.companyCode,
      region: data.region,
      email: data.email,
    });

    router.push(ROUTES.LIST);
  };

  return (
    <div className={style.pageWrapper}>
      <div className={style.loginContainer}>
        <h2 className={style.loginTitle}>Giriş Yap</h2>
        <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputComponent
              name='companyCode'
              control={control}
              placeholder='Şirket Kodu'
              label='Şirket Kodu'
              error={errors.companyCode}
              onlyNumeric
              maxLength={6}
            />
          </div>
          <div>
            <InputComponent
              name='region'
              maxLength={16}
              control={control}
              placeholder='Bölge'
              label='Bölge'
              error={errors.region}
            />
          </div>

          <div>
            <InputComponent
              name='email'
              control={control}
              placeholder='E-posta'
              label='E-posta'
              type='email'
              error={errors.email}
            />
          </div>

          <div>
            <InputComponent
              name='password'
              control={control}
              placeholder='Şifre'
              label='Şifre'
              type='password'
              error={errors.password}
              maxLength={16}
            />
          </div>

          <Button buttonType='submit'>Giriş Yap</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
