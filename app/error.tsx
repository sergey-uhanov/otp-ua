// app/error.tsx
'use client'; // Указываем, что это клиентский компонент

import React, { useEffect } from 'react';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Что-то пошло не так</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
