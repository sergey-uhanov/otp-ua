import Image from 'next/image';
import backgroundImg from '@/public/img/ty-TF8nzurvcYbk40roxa.png';
import style from '@/styles/components/footer.module.css';
import Link from 'next/link';
interface TheFooterProps {}
const TheFooter = ({}: TheFooterProps) => {
  return (
    <footer className={style.footer}>
      <Image
        alt="Mountains"
        src={backgroundImg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <div className={style.footer_img_shadow}></div>
      <div className={style.footer_title}>Контакти та підтримка</div>
      <ul className={style.footer_list}>
        <li className={style.footer_item}>
          <Link href="/">Зв'язатися з нами</Link>
        </li>
        <li className={style.footer_item}>
          <Link href="/">Допомога та підтримка</Link>
        </li>
        <li className={style.footer_item}>
          <Link href="/">Зворотній зв'язок</Link>
        </li>
      </ul>
    </footer>
  );
};

export default TheFooter;
