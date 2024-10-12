import React from 'react';
import style from '@/styles/UI/loader.module.css';
interface LoadingProps {}
const Loading = ({}: LoadingProps) => {
  return (
    <div className={style.wrapper}>
      <div className={style.custom_loader2}></div>;
    </div>
  );
};

export default Loading;
