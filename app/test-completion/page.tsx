import React from 'react';
interface TestCompletionPageProps {}
const TestCompletionPage = ({}: TestCompletionPageProps) => {
  return (
    <div>
      <h1
        style={{
          color: 'green',
          textAlign: 'center',
          minHeight: '100vh',
          fontSize: '3rem',
          paddingTop: '5rem',
        }}
      >
        Дякую за успішне завершення тесту
      </h1>
    </div>
  );
};

export default TestCompletionPage;
