'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useUserStore from '@/stores/slices/user';
import InputComponent from '@/components/forms/inputs/input';
import Button from '@/components/button';
import style from './style.module.scss';
import { ROUTES } from '@/constants/routes';

const loginSchema = yup.object().shape({
  companyCode: yup.string().required('Şirket Kodu zorunludur').max(6, 'Şifre en fazla 6 karakter olmalıdır'),
  region: yup.string().required('Bölge zorunludur'),
  email: yup.string().email('Geçersiz e-posta adresi').required('E-posta zorunludur'),
  password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre zorunludur'),
});

type LoginFormInputs = {
  companyCode: string;
  region: string;
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
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
