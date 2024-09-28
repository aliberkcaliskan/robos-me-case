import localFont from 'next/font/local';

export const gothamFont = localFont({
  src: [
    {
      path: './fonts/Gotham-XLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Light.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Book.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Black.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Ultra.otf',
      weight: '900',
      style: 'normal',
    },
  ],
});
