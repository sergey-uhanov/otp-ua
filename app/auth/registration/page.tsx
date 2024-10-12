'use client';
import React, { useState } from 'react';
import { loginWithCreds } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { handleRegistrationSubmit } from '@/utils/handleRegistrationSubmit';
import style from '@/styles/page/Registration.module.css';
import LinkButton from '@/components/UI/buttons/LinkButton';
import LoginGitHub from '@/components/LoginAuthProvider';
import LoginAuthProvider from '@/components/LoginAuthProvider';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const RegistrationPage = () => {
  const [pending, setPending] = useState<boolean>(false);
  const handleSubmit = async (formData: FormData) => {
    const response = await handleRegistrationSubmit(formData);
    console.log('response', response);

    if (response.success) {
      await loginWithCreds(formData);
    }
  };
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <LinkButton href="/auth/sign-in">Увiйти</LinkButton>
          <LinkButton href="/auth/registration">Реєстрація</LinkButton>
        </div>
        <p>
          Зареєструйтесь на нашому сайті, щоб отримувати доступ до всіх послуг,
          які ми надаємо.
        </p>
        <form action={handleSubmit} className={style.input_block}>
          <div className={style.input_item}>
            <label htmlFor="name">Ім'я</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className={style.input_item}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className={style.input_item}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={8}
            />
          </div>

          <div className={style.input_item}>
            <label htmlFor="confirmPassword">Повторіть пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>

          <div className="">
            <button
              disabled={pending}
              type="submit"
              className={`${pending ? style.disabled_btn : style.active_btn} ${
                style.button_signin
              }`}
            >
              {pending ? 'Loading...' : 'Реєстрація'}
            </button>
          </div>
        </form>
        <div className={style.or}>Чи</div>
        <div className={style.block_auth_provider}>
          <LoginAuthProvider provider="github">
            <FaGithub size={60} color="#000" style={{ cursor: 'pointer' }} />
          </LoginAuthProvider>
          <LoginAuthProvider provider="google">
            <FaGoogle size={60} color="#000" style={{ cursor: 'pointer' }} />
          </LoginAuthProvider>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
