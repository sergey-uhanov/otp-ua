import LoginForm from '@/components/LoginForm';
import LoginGitHub from '@/components/LoginAuthProvider';
import LinkButton from '@/components/UI/buttons/LinkButton';
import style from '@/styles/page/Sign-in.module.css';
import LoginAuthProvider from '@/components/LoginAuthProvider';
import { FaGithub } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

export default function SignIn() {
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <LinkButton href="/auth/sign-in">Увiйти</LinkButton>
          <LinkButton href="/auth/registration">Реєстрація</LinkButton>
        </div>
        <LoginForm />
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
}
