'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ButtonDeleteTestProps {
  deleteTestId: string;
  redirectUrl: string;
}
const ButtonDeleteTest = ({
  deleteTestId,
  redirectUrl,
}: ButtonDeleteTestProps) => {
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/tests/${deleteTestId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push(`/`);
      router.refresh();
      console.log(`Удален результат теста ${deleteTestId}`);
    } else {
      console.error('Ошибка удаления');
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit">Видалити тест</button>
    </form>
  );
};

export default ButtonDeleteTest;
