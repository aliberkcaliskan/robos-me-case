import { Control, FieldError } from 'react-hook-form';

export interface InputComponentProps {
  name: string;
  control?: Control<any>;
  placeholder: string;
  label?: string;
  type?: string;
  error?: FieldError;
  step?: string;
  externalClass?: string;
  maxLength?: number;
  onlyAlhabetic?: boolean;
  onlyNumeric?: boolean;
  [key: string]: any;
}
