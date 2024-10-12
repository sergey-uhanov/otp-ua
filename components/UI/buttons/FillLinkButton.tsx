import Link from 'next/link';
import style from '@/styles/UI/buttons/FillLinkButton.module.css';

interface FillButtonProps {
  children: string;
  url: string;
}
const FillLinkButton = ({ children, url }: FillButtonProps) => {
  return (
    <Link href={url} className={style.button}>
      {children}
    </Link>
  );
};
export default FillLinkButton;
