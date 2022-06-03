import { ReactNode } from 'react';
import reactDom from 'react-dom';

interface IProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: IProps) => {
  const element = document.getElementById('modal') as HTMLElement;

  return reactDom.createPortal(children, element);
};

export default ModalPortal;
