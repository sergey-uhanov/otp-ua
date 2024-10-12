'use client';
import React, { useState } from 'react';
import { loginWithCreds } from '@/actions/auth';
import style from '@/styles/page/Sign-in.module.css';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await loginWithCreds(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setPending(false);
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.input_block}>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className={style.input_item}>
        <label className="">Email</label>
        <input type="email" id="Email" name="email" className="" />
      </div>
      <div className={style.input_item}>
        <label className="">Password</label>
        <input type="password" name="password" id="password" className="" />
      </div>
      <div className="">
        <button
          disabled={pending}
          type="submit"
          className={`${pending ? style.disabled_btn : style.active_btn} ${
            style.button_signin
          }`}
        >
          {pending ? 'Loading...' : 'Увiйти'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
