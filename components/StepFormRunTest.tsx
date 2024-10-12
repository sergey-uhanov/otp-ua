'use client';
import React, { useEffect, useState } from 'react';
import UserReplyForm from './UserReplyForm';
import style from '@/styles/components/stepFormRunTest.module.css';
import CheckConsole from './IsConsoleOpen';
import { enableFullscreen } from '@/utils/enableFullscreen';
interface StepFormRunTestProps {
  test: test;
}
const StepFormRunTest = ({ test }: StepFormRunTestProps) => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState<string | null>(null);
  const [errorMassage, setErrorMassage] = useState('');

  useEffect(() => {
    // Проверяем наличие данных в localStorage на клиенте
    const storedUser = localStorage.getItem(`test_${test.id}`);
    if (storedUser) {
      setUser(storedUser);
    }
  }, [test.id]);

  // Предлагаем пользователю включить полноэкранный режим при первом рендере страницы

  const checkStep2 = () => {
    if (step === 2 && (!userName || !userEmail)) {
      setErrorMassage('Заповніть всі поля');
      return false;
    }
    if (user) {
      const [name, email] = user.split(':');

      setErrorMassage(`Ви вже проходили цей тест ${name} - ${email}`);
      return false;
    }
    localStorage.setItem(`test_${test.id}`, `${userName}:${userEmail}`);
    enableFullscreen();
    return true;
  };
  const nextStep = () => {
    if (step === 2 && !checkStep2()) return;

    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      {step === 1 && (
        <div className={style.wrapper}>
          <div className={style.itemStepFormRunTest}>
            <div>
              <span> Важливо!</span> <br /> Цей тест відстежує спроби
              шахрайства! Заборонено залишати вікно проходження тесту до його
              закінчення! <br />У вас не буде другого шансу пройти тест. <br />{' '}
              Бажаємо успіхів
            </div>
            <button
              id="btn-end-step-1"
              className={style.btn_next_step}
              onClick={nextStep}
            >
              Далее
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className={style.wrapper}>
          <div className={style.person_input_block}>
            <div className={style.input_item}>
              <label htmlFor="">Повне ім'я</label>
              <input
                required
                name="userName"
                type="text"
                placeholder="Введіть повне ім'я"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className={style.input_item}>
              <label htmlFor="">ведіть ваш Email</label>
              <input
                required
                name="userEmail"
                type="email"
                placeholder="ведіть ваш Email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            {errorMassage && (
              <div className={style.error_message}>{errorMassage}</div>
            )}
            <button className={style.btn_next_step} onClick={nextStep}>
              Почати тест
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <UserReplyForm userName={userName} userEmail={userEmail} test={test} />
      )}
      <CheckConsole />
    </>
  );
};

export default StepFormRunTest;
