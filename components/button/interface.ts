import { ButtonTypeEnum } from './enum';

export interface ButtonInterface {
  type?: ButtonTypeEnum;
  isLoading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e?: any) => void;
  externalClass?: string;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
}
