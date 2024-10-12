import { db } from '@/db';
import { NextResponse } from 'next/server';

export async function getAllTests(userId: string) {
  try {
    const tests = await db.test.findMany({
      where: {
        userId: userId,
      },
      include: {
        questions: {
          include: {
            answers: true, // Включаем ответы для каждого вопроса
          },
        },
      },
    });
    return tests;
  } catch (error) {
    console.log(error);
    throw new Error('Ошибка при получении тестов');
  }
}
export async function getTest(testId: string) {
  try {
    const test: test | null = await db.test.findUnique({
      where: {
        id: testId,
      },
      select: {
        testName: true, // Убедитесь, что testName включено в выборку
        id: true,
        userId: true,
        questions: {
          include: {
            answers: true, // Включаем ответы для каждого вопроса
          },
        },
      },
    });
    return test;
  } catch (error) {
    console.log(error);
    throw new Error('Ошибка при получении теста');
  }
}
export async function getQuestionWithAnswers(questionId: string) {
  try {
    const question = await db.question.findUnique({
      where: {
        id: questionId,
      },
      select: {
        id: true,
        question: true,
        answers: {
          select: {
            id: true,
            text: true,
            isCorrect: true, // Получаем флаг правильного ответа
          },
        },
      },
    });
    return question;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при получении вопроса');
  }
}
export async function deleteTest(testId: string) {
  try {
    const test = await db.test.delete({
      where: {
        id: testId,
      },
    });
    return test;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при удалении теста');
  }
}
