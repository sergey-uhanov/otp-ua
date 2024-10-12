'use client';
import React, { useState } from 'react';
import style from '@/styles/page/runTest.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { disableFullscreen } from '@/utils/disableFullscreen';

import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { createTestResult } from '@/actions/resultTest';

interface UserReplyFormProps {
  test: test;
  userName: string;
  userEmail: string;
}

const UserReplyForm = ({ test, userName, userEmail }: UserReplyFormProps) => {
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<any>({});
  const [testSummary, setTestSummary] = useState<any>({}); // Для хранения полных данных
  const [errorMassage, setErrorMassage] = useState<string | null>(null);
  const router = useRouter();

  const typeInput = (type: string) => {
    switch (type) {
      case 'single':
        return 'radio';
      case 'multiple':
        return 'checkbox';
      case 'open':
        return 'text';
      default:
        return 'text';
    }
  };

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    answerId: string
  ) => {
    const { value, checked, type } = e.target;

    if (type === 'checkbox') {
      const existingAnswers = userAnswers[questionId] || [];
      if (checked) {
        setUserAnswers({
          ...userAnswers,
          [questionId]: [...existingAnswers, value],
        });
      } else {
        setUserAnswers({
          ...userAnswers,
          [questionId]: existingAnswers.filter(
            (answer: string) => answer !== value
          ),
        });
      }
    } else {
      setUserAnswers({
        ...userAnswers,
        [questionId]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const testResults: any = {};
    const summary: any = {
      testId: test.id,
      userName: userName,
      userEmail: userEmail,
      userAnswers: [],
    };

    test.questions.forEach((question) => {
      let userAnswer = userAnswers[question.id];

      // Преобразуем строку в массив, если это не массив
      if (!Array.isArray(userAnswer)) {
        userAnswer = [userAnswer];
      }

      const correctAnswers = question.answers
        .filter((answer) => answer.isCorrect)
        .map((answer) => answer.text);

      const isCorrect =
        userAnswer.every((ans: string) => correctAnswers.includes(ans)) &&
        correctAnswers.length === userAnswer.length;

      testResults[question.id] = isCorrect;

      // Сбор полной информации для каждого вопроса
      summary.userAnswers.push({
        questionId: question.id,
        answers: userAnswer, // Всегда массив
        isCorrect: isCorrect,
      });
    });

    setResults(testResults);

    try {
      const response = await createTestResult(summary);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMassage(
        'Не удалось сохранить результаты теста. Попробуйте позже.'
      );
      return;
    }
  };

  return (
    <div>
      {isSubmitted && (
        <button
          className={style.submit_btn}
          onClick={() => {
            router.push('/test-completion');
            disableFullscreen();
          }}
        >
          Покинути сторiнку
        </button>
      )}
      {test.questions.map((question: question, index) => (
        <div key={index} className={style.question_item}>
          <div className={style.question_number}>Питання {index + 1}</div>
          {question.image?.url && (
            <Image
              src={question.image.url}
              alt={question.image.public_id}
              width={400}
              height={300}
              className={style.question_image}
            />
          )}
          <h6 className={style.question_text}>{question.question}</h6>
          <ul>
            {question.answers.map((answer: answer, idx) => (
              <li key={idx} className={style.answer_item}>
                <label className={style.answer_label}>
                  <input
                    type={typeInput(question.type)}
                    name={question.id}
                    value={answer.text}
                    checked={
                      Array.isArray(userAnswers[question.id])
                        ? userAnswers[question.id].includes(answer.text)
                        : userAnswers[question.id] === answer.text
                    }
                    onChange={(e) =>
                      handleAnswerChange(e, question.id, answer.id!)
                    }
                    disabled={isSubmitted}
                  />
                  {answer.text}
                </label>

                {isSubmitted && (
                  <span
                    className={
                      answer.isCorrect
                        ? style.correct_answer
                        : style.incorrect_answer
                    }
                  >
                    {answer.isCorrect ? '✓ Правильна' : '✗ Неправильна'}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {isSubmitted && (
            <div
              className={results[question.id] ? style.correct : style.incorrect}
            >
              {results[question.id]
                ? 'Ви відповіли правильно'
                : 'Ваша відповідь помилкова'}
            </div>
          )}
        </div>
      ))}
      {errorMassage && (
        <div className={style.error_message}>{errorMassage}</div>
      )}
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          className={style.submit_btn}
          disabled={isSubmitted}
        >
          Завершити тест
        </button>
      ) : (
        <button
          className={style.submit_btn}
          onClick={() => {
            router.push('/test-completion');
            disableFullscreen();
          }}
        >
          Покинути сторiнку
        </button>
      )}
    </div>
  );
};

export default UserReplyForm;
