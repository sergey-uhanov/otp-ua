import { m } from 'framer-motion';
import React from 'react';
interface SuccessProps {}
const style = {
  margin: '50px auto',
  color: 'green',
  fontSize: '30px',
};
const Success = ({}: SuccessProps) => {
  return (
    <div style={{ minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={style}>Тест успішно створено </h1>
    </div>
  );
};

export default Success;
