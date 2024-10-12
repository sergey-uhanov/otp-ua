'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import style from '@/styles/UI/buttons/ButtonDeleteResultTest.module.css';
import { NextResponse } from 'next/server';
interface ButtonDeleteResultTestProps {
  deleteResultTestId: string;
}
const ButtonDeleteResultTest = ({
  deleteResultTestId,
}: ButtonDeleteResultTestProps) => {
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/resultTest/${deleteResultTestId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      //  router.push(`/ready-tests/results/${redirectUrl}`);
      router.push(`/ready-tests/`);
      router.refresh();
    } else {
      console.error('Ошибка удаления');
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className={style.testItemDelete}>
        <FaTimes />
      </button>
    </form>
  );
};

export default ButtonDeleteResultTest;
