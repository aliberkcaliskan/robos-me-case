import React from 'react';

interface LoginPagesLayoutProps {
  children: React.ReactNode;
}

const LoginPagesLayout: React.FC<LoginPagesLayoutProps> = async ({ children }) => {
  return <>{children}</>;
};

export default LoginPagesLayout;
