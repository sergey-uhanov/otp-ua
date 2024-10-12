'use client';
import React, { useEffect } from 'react';
interface CheckConsoleProps {}
const CheckConsole = ({}: CheckConsoleProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode >= 112 && event.keyCode <= 123) {
        // F1 - F12
        event.preventDefault();
        alert(
          `Нажата клавиша F${
            event.keyCode - 111
          }. Це не дозволено правилами тестування. `
        );
      }
    };
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return <></>;
};

export default CheckConsole;
