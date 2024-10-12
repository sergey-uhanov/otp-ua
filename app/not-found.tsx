'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import img404 from '@/public/404.png';
import Image from 'next/image';

export default function NotFound() {
  const router = useRouter();
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, []);
  setInterval(() => {
    setTimer(timer - 1);
  }, 1050);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          color: 'white',
          position: 'absolute',
          top: '20px',
          left: 0,
          zIndex: 1,
        }}
      >
        Автоматичне перенаправлення на головну сторінку через {timer} секунди
      </h1>
      <Image
        alt="Mountains"
        src={img404}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
