'use client';
import { login } from '@/actions/auth';
import { FaGithub } from 'react-icons/fa';
import style from '@/styles/page/Sign-in.module.css';
interface LoginAuthProviderProps {
  provider: string;
  children: React.ReactNode;
}
export default function LoginAuthProvider({
  provider,
  children,
}: LoginAuthProviderProps) {
  return (
    <div onClick={() => login(provider)} className={style.auth_provaider}>
      {children}
    </div>
  );
}
