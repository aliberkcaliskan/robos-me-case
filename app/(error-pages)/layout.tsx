import style from './style.module.scss';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

interface ErrorPagesProps {
  children: React.ReactNode;
}
const ErrorPagesLayout: React.FC<ErrorPagesProps> = ({ children }) => {
  return (
    <div className={style.layout}>
      <div className={style.header_wrapper}>
        <Link href={ROUTES.LOGIN} passHref></Link>
      </div>
      <div className={style.container}>{children}</div>
    </div>
  );
};

export default ErrorPagesLayout;
