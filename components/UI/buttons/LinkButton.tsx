'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import style from '@/styles/UI/buttons/LinkButton.module.css';

interface LinkButtonProps {
  children: string;
  href: string;
}
const LinkButton = ({ children, href }: LinkButtonProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`${isActive ? style.active : style.not_active} ${
        style.link_button
      }`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
