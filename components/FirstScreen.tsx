import React from 'react';
import style from '@/styles/page/HomePage.module.css';
import Image from 'next/image';
import banner from '@/public/img/bPOGNwCWuXYCecK7QrcHM.jpg';

import LinkBorderButton from './UI/buttons/LinkBorderButton';
import FillLinkButton from './UI/buttons/FillLinkButton';
interface FirstScreenProps {}
const FirstScreen = ({}: FirstScreenProps) => {
  return (
    <section className={style.firstScreen}>
      <div className={style.banner}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Image
            alt="Mountains"
            src={banner}
            sizes="100vw"
            style={{
              width: '100%',
              height: '630px',
              minWidth: '300px',
              maxWidth: '360px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
      <div className={style.firstScreen_text_bloc}>
        <h1 className={style.firstScreen_title}>
          Створіть свої ідеальні опитування та тести
        </h1>
        <p className={style.firstScreen_content}>
          Наш інтуїтивний конструктор опитань та тестів допоможе вам створювати
          ефективні інструменти для збору цінної інформації та взаємодії з вашою
          аудиторією.
        </p>
        <div className={style.firstScreen_btn_container}>
          <FillLinkButton url="/create-page">
            Створити опитування
          </FillLinkButton>
          <LinkBorderButton url="/">Преглянути приклади</LinkBorderButton>
        </div>
      </div>
    </section>
  );
};

export default FirstScreen;
