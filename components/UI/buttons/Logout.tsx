'use client';
import { logout } from '@/actions/auth';
import style from '@/styles/UI/buttons/ColorButton.module.css';

export default function Logout() {
  return (
    <div className={style.color_button} onClick={() => logout()}>
      Вийти
    </div>
  );
}
