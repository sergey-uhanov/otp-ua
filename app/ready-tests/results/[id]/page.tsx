import { getTestResults } from '@/actions/resultTest';
import { getTest } from '@/actions/tests';
import ButtonDeleteResultTest from '@/components/UI/buttons/buttonDeleteResultTest';
import { resultTest } from '@/interfaces/tests.interface';
import style from '@/styles/page/resultTest.module.css';
import Link from 'next/link';

import React from 'react';
import { FaTimes } from 'react-icons/fa';
interface ResultTestProps {
  params: {
    id: string;
  };
}
const ResultTest = async ({ params }: ResultTestProps) => {
  const { id } = params;
  const test: test | null = await getTest(id);

  if (!test) {
    return <div>Тест не найден</div>;
  }
  const listResultTest: resultTest[] = await getTestResults(id);
  if (listResultTest.length === 0) {
    return (
      <div className={style.container}>
        <h1
          style={{
            textAlign: 'center',
            margin: '20px',
            fontSize: '2rem',
          }}
        >
          Тест ще не проходили
        </h1>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>Список результатов теста: {test.testName}</h1>
      {listResultTest.map((result) => (
        <Link
          href={`/ready-tests/results/detailed-report/${result.id}`}
          key={result.id}
        >
          <div className={style.result_card}>
            <p>
              <span>Имя користувача:</span> {result.userName}
            </p>
            <p>
              <span>Email користувача: </span>
              {result.userEmail}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ResultTest;
