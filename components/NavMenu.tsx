'use server';
import React, { useState } from 'react';
import style from '@/styles/components/header.module.css';
import LinkButton from './UI/buttons/LinkButton';
import { session } from '@/interfaces/auth.interface';

interface NavMenuProps {
  session: session | null;
}
const NavMenu = ({ session }: NavMenuProps) => {
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <nav>
      <ul className={style.nav_menu}>
        <li>
          <LinkButton href={'/'}>Головна</LinkButton>
        </li>

        {session?.user && (
          <>
            <li>
              <LinkButton href={'/create-page'}>Створити тест</LinkButton>
            </li>
            <li>
              <LinkButton href={'/ready-tests'}>Готовi тести</LinkButton>
            </li>
          </>
        )}

        {isAdmin && (
          <li>
            <LinkButton href={'/dashboard'}>Admin panel</LinkButton>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
