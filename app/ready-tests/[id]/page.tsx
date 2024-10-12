import { getTest } from '@/actions/tests';
import ButtonDeleteTest from '@/components/UI/buttons/buttonDeleteTest';
import CopyLinkComponent from '@/components/UI/CopyLinkComponent';
import style from '@/styles/page/SpecificTest.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface SpecificTestProps {
  params: {
    id: string;
  };
}
const SpecificTest = async ({ params }: SpecificTestProps) => {
  const { id } = params;
  const test = await getTest(id);

  return (
    <main className={style.specificTest}>
      <div className={style.header}>
        <h1 className={style.title}>{test?.testName}</h1>
        <div className={style.link_block}>
          <CopyLinkComponent id={id} />
          <div className={style.link_block_item}>
            <ButtonDeleteTest deleteTestId={id} redirectUrl={'/'} />
            <Link
              className={style.resultsLink}
              href={`/ready-tests/results/${id}`}
            >
              Результати проходження тесту
            </Link>
          </div>
        </div>
      </div>
      {test?.questions?.map((question, index) => (
        <div
          id={`question-${index}`}
          className={style.questionItem}
          key={question.id}
        >
          <div className={style.questionNumber}>Питання {index + 1} </div>
          {question.image && (
            <Image
              className={style.questionImage}
              src={question.image.url}
              alt={question.question}
              width={200}
              height={200}
              style={{
                objectFit: 'cover',
              }}
            />
          )}

          <div className={style.questionText}> {question.question}</div>
          {question.answers?.map((answer, index) => (
            <div className={style.answerItem} key={index}>
              <div
                className={`${style.answerText} ${
                  answer.isCorrect ? style.correct : style.incorrect
                }`}
              >
                {answer.text}
              </div>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
};

export default SpecificTest;
