import Image from 'next/image';
import style from '@/styles/components/header.module.css';
import Link from 'next/link';
import { auth } from '@/auth';
import FillLinkButton from './UI/buttons/FillLinkButton';
import Logout from './UI/buttons/Logout';
import LinkBorderButton from './UI/buttons/LinkBorderButton';
import { MdAccountCircle } from 'react-icons/md';
import NavMenu from './NavMenu';

export default async function TheHeader() {
  const session = await auth();

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href="/">
          <Image
            src="/icon/ukrainian-survey-logo.svg"
            alt="logo"
            width={70}
            height={50}
          />
        </Link>
      </div>
      <NavMenu session={session} />
      <div className={style.auth_block}>
        {!session?.user ? (
          <div className={style.auth_buttons}>
            <LinkBorderButton url={'/auth/sign-in'}>Увiйти</LinkBorderButton>
            <FillLinkButton url={'/auth/registration'}>
              Реєстрація
            </FillLinkButton>
          </div>
        ) : (
          <div className={style.auth_buttons}>
            {session.user.image ? (
              <Image
                className={style.userImage}
                src={session.user.image}
                alt="user-image"
                width={30}
                height={30}
              />
            ) : (
              <MdAccountCircle size={30} />
            )}
            {session.user.name}

            <Logout />
          </div>
        )}
      </div>
    </header>
  );
}
