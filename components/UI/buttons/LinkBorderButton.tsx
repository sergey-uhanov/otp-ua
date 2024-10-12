import Link from 'next/link';
import style from '@/styles/UI/buttons//LinkBorderButton.module.css';

interface LinkBorderButtonProps {
  children: string;
  url: string;
}
const LinkBorderButton = ({ children, url }: LinkBorderButtonProps) => {
  return (
    <Link href={url} className={style.button}>
      {children}
    </Link>
  );
};
export default LinkBorderButton;
