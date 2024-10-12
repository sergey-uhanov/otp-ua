'use client';
import style from '@/styles/page/HomePage.module.css';
import Image from 'next/image';
import banner2 from '@/public/img/ZyA75tx2qfKAOPQIEHA8s.jpg';
import banner3 from '@/public/img/wm0HXUAukZCUi7n3QnBKx.jpg';
import banner4 from '@/public/img/OaQS0mqaGLh_PDEG9LzWk.jpg';
import arrow from '@/public/img/icons8-chevron-left-40 (2).png';
import { use, useEffect, useRef, useState } from 'react';
import FirstScreen from '@/components/FirstScreen';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const schemeDescriptionRef = useRef(null);
  const [isVisibleSchemeDescription, setIsVisibleSchemeDescription] =
    useState(false);
  const DesignCustomizationRef = useRef(null);
  const [isVisibleDesignCustomization, setIsVisibleDesignCustomization] =
    useState(false);
  const analyticsRef = useRef(null);
  const [isVisibleAnalytics, setIsVisibleAnalytics] = useState(false);
  const observeElement = (ref: any, setVisible: any) => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  };

  useEffect(() => observeElement(elementRef, setIsVisible), []);
  useEffect(
    () => observeElement(schemeDescriptionRef, setIsVisibleSchemeDescription),
    []
  );
  useEffect(
    () =>
      observeElement(DesignCustomizationRef, setIsVisibleDesignCustomization),
    []
  );
  useEffect(() => observeElement(analyticsRef, setIsVisibleAnalytics), []);

  return (
    <main className={style.main}>
      <FirstScreen />

      <section ref={elementRef} className={style.site_description}>
        <div
          className={`${style.site_description_content} ${
            isVisible ? style.animate : style.hidden
          }`}
        >
          <h2 className={style.site_description_title}>Про наш конструктор</h2>
          <div className={style.site_description_card}>
            <div className={style.card_tile}>Інтуїтивний інтерфейс</div>
            <div className={style.card_content}>
              Наш конструктор розроблений з урахуванням простоти та зручності
              використання. Навіть без попереднього досвіду ви зможете
              створювати професійні опитування та тести за лічені хвилини.
            </div>
          </div>
          <div className={style.site_description_card}>
            <div className={style.card_tile}>Інтуїтивний інтерфейс</div>
            <div className={style.card_content}>
              Наш конструктор розроблений з урахуванням простоти та зручності
              використання. Навіть без попереднього досвіду ви зможете
              створювати професійні опитування та тести за лічені хвилини.
            </div>
          </div>
          <div className={style.site_description_card}>
            <div className={style.card_tile}>Інтуїтивний інтерфейс</div>
            <div className={style.card_content}>
              Наш конструктор розроблений з урахуванням простоти та зручності
              використання. Навіть без попереднього досвіду ви зможете
              створювати професійні опитування та тести за лічені хвилини.
            </div>
          </div>
        </div>
        <div
          className={`${style.site_description_banner} ${
            isVisible ? style.banner_animate : style.banner_hidden
          }`}
        >
          <div>
            <Image
              alt="Mountains"
              src={banner2}
              sizes="100vw"
              style={{
                width: '100%',
                height: '800px',
                minWidth: '200px',
                maxWidth: '360px',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------------- */}
      <section ref={schemeDescriptionRef} className={style.scheme_description}>
        <div className={style.scheme_description_wrapper}></div>
        <h2
          className={`${style.scheme_description_title} ${
            isVisibleSchemeDescription ? style.animate : style.hidden
          }`}
        >
          Створення опитувань та тестів
        </h2>

        <div className={`${style.scheme_description_schema}  `}>
          <div className={`${style.left_block} `}>
            <div
              className={`${style.scheme_description_schema_item_left} ${
                isVisibleSchemeDescription ? style.animate : style.hidden
              }`}
            >
              <div className={style.scheme_description_schema_item_title}>
                Вибір типу опитування
              </div>
              <div className={style.scheme_description_schema_item_content}>
                Виберіть тип опитування, який найкраще відповідає вашим цілям:
                збір зворотнього зв'язку, дослідження ринку, тестування знань,
                оцінка ефективності тощо.
              </div>
            </div>
            <div
              className={`${style.scheme_description_schema_item_left} ${
                isVisibleSchemeDescription ? style.animate : style.hidden
              }`}
            >
              <div className={style.scheme_description_schema_item_title}>
                Формування структури
              </div>
              <div className={style.scheme_description_schema_item_content}>
                Розмістіть питання в логічній послідовності, додайте розділи,
                групи, і скористайтеся можливостями умовної логіки, щоб
                розгалужувати опитування залежно від відповідей користувача.
              </div>
            </div>
            <div
              className={`${style.scheme_description_schema_item_left} ${
                isVisibleSchemeDescription ? style.animate : style.hidden
              }`}
            >
              <div className={style.scheme_description_schema_item_title}>
                Публікація та розповсюдження
              </div>
              <div className={style.scheme_description_schema_item_content}>
                Опублікуйте своє опитування або тест, розмістіть його на
                веб-сайті, у соціальних мережах, або розішліть по електронній
                пошті.
              </div>
            </div>
          </div>
          <div className={style.right_block}>
            <div
              className={`${style.scheme_description_schema_item_right} ${
                isVisibleSchemeDescription ? style.animate : style.hidden
              }`}
            >
              <div className={style.scheme_description_schema_item_title}>
                Створення питань
              </div>
              <div className={style.scheme_description_schema_item_content}>
                Додайте питання, вибираючи з різних типів: набір відповідей,
                шкала оцінки, відкрите питання, завантаження файлів, і інше.
                Налаштовуйте кожне питання відповідно до своїх потреб.
              </div>
            </div>
            <div
              className={`${style.scheme_description_schema_item_right} ${
                isVisibleSchemeDescription ? style.animate : style.hidden
              }`}
            >
              <div className={style.scheme_description_schema_item_title}>
                Дизайн та брендинг
              </div>
              <div className={style.scheme_description_schema_item_content}>
                Налаштуйте дизайн опитування, додайте логотип, виберіть колірну
                гаму, шрифти, і фон, щоб створити привабливий та індивідуальний
                візуальний образ.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------------------------- */}
      <div className={style.plug}></div>
      <section className={style.Design_customization}>
        <div className={style.scheme_description_wrapper}></div>
        <div className={style.Design_customization_title}>
          Налаштування дизайну
        </div>
        <div className={style.Design_customization_content}>
          <div className={style.Design_customization_content_item}>
            <div className={style.Design_customization_content_item_title}>
              Шрифти
            </div>
            <div className={style.Design_customization_content_item_content}>
              Вибирайте з широкого набору шрифтів, щоб забезпечити оптимальну
              читабельність та створити бажаний візуальний стиль.
            </div>
          </div>
          <div className={style.Design_customization_content_item}>
            <div className={style.Design_customization_content_item_title}>
              Кольори
            </div>
            <div className={style.Design_customization_content_item_content}>
              Використовуйте колірні схеми, які відповідають вашому бренду, щоб
              створити єдиний та запам'ятовуваний стиль опитування.
            </div>
          </div>
          <div className={style.Design_customization_content_item}>
            <div className={style.Design_customization_content_item_title}>
              Зображення та відео
            </div>
            <div className={style.Design_customization_content_item_content}>
              Додайте зображення та відео, щоб зробити опитування цікавішим,
              наочнішим, і більш привабливим для користувачів.
            </div>
          </div>
        </div>
      </section>
      <div className={style.plug}></div>
      <section ref={DesignCustomizationRef} className={style.analytics}>
        <div
          className={`${style.analytics_bunner} ${
            isVisibleDesignCustomization ? style.animate : style.hidden
          }`}
        >
          <Image
            alt="graf"
            src={banner3}
            sizes="100vw"
            style={{
              maxWidth: '400px',
              width: '100%',
              height: '900px',
              borderRadius: 'var(--border-radius-button)',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={`${style.analytics_content} `}>
          <h3
            className={`${style.analytics_title} ${
              isVisibleDesignCustomization ? style.animate : style.hidden
            }`}
          >
            Аналітика та звітність
          </h3>
          <ul className={style.analytics_card_block}>
            <li
              className={`${style.analytics_card} ${
                isVisibleDesignCustomization ? style.animate : style.hidden
              }`}
            >
              <div className={style.arrow}>
                <Image
                  alt="arrow"
                  src={arrow}
                  width={30}
                  height={60}
                  style={{
                    transform: 'rotate(-90deg)translateY(10px)',
                  }}
                />
              </div>
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>1</div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>Збір даних</div>
                  <div className={style.analytics_item_content}>
                    Після публікації опитування ви отримуватимете дані від
                    респондентів у режимі реального часу.
                  </div>
                </div>
              </div>
            </li>
            <li
              className={`${style.analytics_card} ${
                isVisibleDesignCustomization ? style.animate : style.hidden
              }`}
            >
              <div className={style.arrow}>
                <Image
                  alt="arrow"
                  src={arrow}
                  width={30}
                  height={60}
                  style={{
                    transform: 'rotate(-90deg)translateY(10px)',
                  }}
                />
              </div>
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>2</div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>
                    Візуалізація результатів
                  </div>
                  <div className={style.analytics_item_content}>
                    Переглядайте результати опитування в зручних графіках,
                    діаграмах, і таблицях, щоб швидко зрозуміти тенденції та
                    отримати цінну інформацію.
                  </div>
                </div>
              </div>
            </li>
            <li
              className={`${style.analytics_card} ${
                isVisibleDesignCustomization ? style.animate : style.hidden
              }`}
            >
              <div className={style.arrow}>
                <Image
                  alt="arrow"
                  src={arrow}
                  width={30}
                  height={60}
                  style={{
                    transform: 'rotate(-90deg)translateY(10px)',
                  }}
                />
              </div>
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>3</div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>
                    Глибока аналітика
                  </div>
                  <div className={style.analytics_item_content}>
                    Застосуйте фільтри, сегментацію, і розширені функції
                    аналізу, щоб отримати глибоке розуміння даних та відповісти
                    на складні питання.
                  </div>
                </div>
              </div>
            </li>
            <li
              className={`${style.analytics_card} ${
                isVisibleDesignCustomization ? style.animate : style.hidden
              }`}
            >
              <div className={style.arrow}>
                <Image
                  alt="arrow"
                  src={arrow}
                  width={30}
                  height={60}
                  style={{
                    transform: 'rotate(-90deg)translateY(10px)',
                  }}
                />
              </div>
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>4</div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>
                    Звіти та експорт
                  </div>
                  <div className={style.analytics_item_content}>
                    Генеруйте звіти з детальною інформацією про результати
                    опитування, або експортуйте дані в різних форматах для
                    подальшого аналізу.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section ref={analyticsRef} className={style.analytics}>
        <div className={style.analytics_content}>
          <h3
            className={`${style.analytics_title} ${
              isVisibleAnalytics ? style.animate : style.hidden
            }`}
          >
            Аналітика та звітність
          </h3>
          <ul
            className={`${style.analytics_card_block} ${style.alternatve_style}`}
          >
            <li
              className={`${style.analytics_card} ${
                isVisibleAnalytics ? style.animate : style.hidden
              }`}
            >
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>
                  <span>1</span>
                </div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>CRM-системи</div>
                  <div className={style.analytics_item_content}>
                    Інтегруйте опитування з вашою CRM-системою, щоб збирати
                    контакти та дані про клієнтів.
                  </div>
                </div>
              </div>
            </li>
            <li
              className={`${style.analytics_card} ${
                isVisibleAnalytics ? style.animate : style.hidden
              }`}
            >
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>
                  <span>2</span>
                </div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>
                    Електронна пошта
                  </div>
                  <div className={style.analytics_item_content}>
                    Відправляйте опитування та тести безпосередньо з платформи,
                    автоматизуйте збір зворотнього зв'язку, і керуйте
                    розсилками.
                  </div>
                </div>
              </div>
            </li>
            <li
              className={`${style.analytics_card} ${
                isVisibleAnalytics ? style.animate : style.hidden
              }`}
            >
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>
                  <span>3</span>
                </div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>
                    Соціальні мережі
                  </div>
                  <div className={style.analytics_item_content}>
                    Розміщуйте опитування в соціальних мережах, щоб розширити
                    охоплення та залучити більшу аудиторію.
                  </div>
                </div>
              </div>
            </li>
            <li
              className={`${style.analytics_card} ${
                isVisibleAnalytics ? style.animate : style.hidden
              }`}
            >
              <div className={style.analytics_card_content}>
                <div className={style.analytics_item_number}>
                  <span>4</span>
                </div>
                <div className={style.analytics_item}>
                  <div className={style.analytics_item_title}>
                    Аналітичні інструменти
                  </div>
                  <div className={style.analytics_item_content}>
                    Інтегруйте з аналітичними інструментами, щоб збирати та
                    аналізувати дані про поведінку користувачів.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={style.analytics_bunner}>
          <Image
            alt="graf"
            src={banner4}
            sizes="100vw"
            style={{
              maxWidth: '400px',
              width: '100%',
              height: '900px',
              borderRadius: 'var(--border-radius-button)',
              objectFit: 'cover',
            }}
          />
        </div>
      </section>
    </main>
  );
}
