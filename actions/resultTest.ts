import { resultTest } from '@/interfaces/tests.interface';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { DetailedReportResultTest } from '@/interfaces/detailsReport.interface';

export async function createTestResult(data: resultTest) {
  try {
    const response = await fetch('/api/resultTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании отчета о тесте');
    }

    const result: NextResponse = await response.json();

    return result;
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function getTestResults(id: string) {
  const response = await db.resultTest.findMany({
    where: { testId: id },
  });

  if (!response) {
    throw new Error('Отчет о тесте не найден');
  }

  return response;
}

export async function detailedReportResultTest(
  id: string
): Promise<DetailedReportResultTest | null> {
  try {
    const response = await db.resultTest.findUnique({
      where: { id },
      include: {
        test: {
          include: {
            questions: {
              include: {
                answers: true, // Включаем ответы на вопросы
              },
            },
            user: true, // Включаем данные о пользователе, который создал тест
          },
        },
        userAnswers: true, // Включаем ответы пользователя
      },
    });

    if (!response) {
      throw new Error('ResultTest not found');
    }

    // Преобразуем имя поля с заглавной буквы в строчную (если необходимо)
    const transformedResponse = {
      ...response,
      userAnswers: response.userAnswers.map((answer) => ({
        ...answer,
        resultTestId: answer.ResultTestId, // Преобразуем поле ResultTestId в resultTestId
      })),
    };

    return transformedResponse as DetailedReportResultTest;
  } catch (error) {
    console.error('Ошибка при получении данных теста:', error);
    throw new Error('Не удалось получить данные по результату теста');
  }
}
export async function deleteResultTest(testId: string) {
  try {
    const result = await db.resultTest.delete({
      where: { id: testId },
    });

    // Проверка, что связанные UserAnswer удалены
    const userAnswers = await db.userAnswer.findMany({
      where: { ResultTestId: testId },
    });

    return NextResponse.json({ message: 'Результат теста удален' });
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при удалении результата теста');
  }
}
