import { db } from '@/db';
import { resultTest, userAnswers } from '@/interfaces/tests.interface';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data: resultTest = await req.json();
  console.log('data2', data);
  try {
    const newTestResult = await db.resultTest.create({
      data: {
        testId: data.testId,
        userName: data.userName,
        userEmail: data.userEmail,
        userAnswers: {
          create: data.userAnswers!.map((answer: userAnswers) => ({
            questionId: answer.questionId,
            answers: answer.answers,
            isCorrect: answer.isCorrect,
            // ResultTestId: data.testId,
          })),
        },
      },
      include: {
        userAnswers: true,
      },
    });

    return NextResponse.json(newTestResult);
  } catch (error) {
    console.error('Ошибка при создании отчета о прохождении теста:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании отчета о прохождении теста' },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const testId = url.searchParams.get('testId');

    if (!testId) {
      throw new Error('testId отсутствует в запросе');
    }
    const testResults = await db.resultTest.findFirstOrThrow({
      where: {
        testId: testId,
      },
      include: {
        userAnswers: true,
      },
    });

    return NextResponse.json(testResults);
  } catch (error) {
    console.error('Ошибка при получении тестов:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении тестов' },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   try {
//     await deleteResultTest(id); // Ваша функция для удаления результата теста
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Ошибка удаления результата теста1111111111111111111' },
//       { status: 500 }
//     );
//   }
// }
