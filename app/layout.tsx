import { gothamFont } from '@/components/font';
import type { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';
import InitializeApp from '@/components/InitializeApp';

export const metadata: Metadata = {
  title: 'Robosme',
  description: 'Robosme',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr' className={gothamFont.className}>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </head>
      <body className='body'>
        <div id='robosme-body' className='robosme-body'>
          <InitializeApp>{children}</InitializeApp>
        </div>
      </body>
    </html>
  );
}
