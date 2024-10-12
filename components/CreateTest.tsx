'use client';
import CreateQuestions from '@/components/CreateQuestions';
import React, { useState } from 'react';
import style from '@/styles/page/createTest.module.css';
import ListQuestions from '@/components/ListQuestions';
import { CreateTestRoute } from '@/actions/createTest';
import { useRouter } from 'next/navigation';

interface CreateTestPageProps {
  userId: string;
}

const CreateTest = ({ userId }: CreateTestPageProps) => {
  const [listQuestions, setListQuestions] = useState<question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<question | null>({
    id: '',
    type: '',
    question: '',
    answers: [],
  });
  const [nameTest, setNameTest] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  async function handleCreateTest() {
    const newTest = {
      testName: nameTest,
      questions: listQuestions,
      userId: userId,
    };

    try {
      const response = await CreateTestRoute(newTest);

      router.push('/create-page/success');
    } catch (error) {
      setError('Вибачте сталася помилка, спробуйте ще раз пізніше');
    }
  }

  return (
    <>
      <div className={style.header}>
        <input
          type="text"
          id="testName"
          placeholder={'Назва тесту'}
          onChange={(e) => setNameTest(e.target.value)}
          value={nameTest}
          className={style.input_answer}
        />
        <button onClick={handleCreateTest} className={style.button_create_test}>
          Створити тест
        </button>
      </div>
      <main className={style.container}>
        <CreateQuestions
          listQuestions={listQuestions}
          setListQuestions={setListQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          error={error}
        />
        <ListQuestions
          listQuestions={listQuestions}
          setListQuestions={setListQuestions}
          setSelectedQuestion={setSelectedQuestion}
          selectedQuestion={selectedQuestion}
        />
      </main>
    </>
  );
};

export default CreateTest;
