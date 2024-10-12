import { db } from '@/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { testName, questions, userId } = await req.json();

  try {
    const newTest = await db.test.create({
      data: {
        testName: testName,
        userId: userId, // Ссылка на пользователя, который создает тест
        questions: {
          create: questions.map((q: question) => ({
            id: q.id,
            question: q.question,
            type: q.type,
            image: q.image || null,
            answers: {
              create: q.answers.map((a) => ({
                text: a.text,
                isCorrect: a.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    return NextResponse.json(newTest);
  } catch (error) {
    throw new Error('Неверные данные для создания теста');
  }
}
