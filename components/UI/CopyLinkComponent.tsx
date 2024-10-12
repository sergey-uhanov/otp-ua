'use client';
import React, { useState } from 'react';
import style from '@/styles/UI/CopyLinkComponent.module.css';
import { FaCheck } from 'react-icons/fa';
import Checkbox from './buttons/checkCopy';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface CopyLinkComponentProps {
  id: string;
}

const CopyLinkComponent = ({ id }: CopyLinkComponentProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const link = `${baseUrl}/test-run/${id}`;
  const [copied, setCopied] = useState(false);

  // Анимация для появления
  const enterVariant = {
    hidden: { opacity: 0, y: -500 }, // Исходное состояние (скрыто, внизу)
    visible: { opacity: 1, y: 0 }, // Появление (подъем вверх и проявление)
  };

  // Анимация для исчезновения
  const exitVariant = {
    visible: { opacity: 1, scale: 1, rotate: 0 },
    hidden: { opacity: 0, scale: 0.5, rotate: 10 }, // Исчезновение (уменьшение и вращение)
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
      })
      .then(() => {
        setTimeout(() => {
          setCopied(false);
        }, 2000); // Скрытие через 2 секунды
      })
      .catch((err) => {
        console.error('Ошибка при копировании: ', err);
      });
  };

  return (
    <div className={`${style.wrapper} `}>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 500 }}
            className={style.isCopied}
            key="copy-status"
          >
            <FaCheck
              style={{
                color: 'green',
                fontSize: '24px',
                position: 'relative',
                top: '5px',
                left: '-5px',
              }}
            />
            Скопiйовано в буфер обмiну!
          </motion.div>
        )}
      </AnimatePresence>
      <div className={style.wrapper_checkbox}>
        <Checkbox link={link} copyToClipboard={copyToClipboard} />
      </div>
      <Link id="test-run-link" className={style.link} href={link}>
        Пройти тест
      </Link>
    </div>
  );
};

export default CopyLinkComponent;
