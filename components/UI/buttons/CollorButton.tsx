import React from 'react';
import Style from '@/styles/UI/buttons/ColorButton.module.css';
interface ColorButtonProps {
  children: React.ReactNode;
}
const ColorButton = ({ children }: ColorButtonProps) => {
  return <div className={Style.color_button}>{children}</div>;
};

export default ColorButton;
