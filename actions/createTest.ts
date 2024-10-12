import { NextResponse } from 'next/server';

export async function CreateTestRoute(testData: test): Promise<NextResponse> {
  try {
    const response = await fetch('/api/tests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result: NextResponse = await response.json();

    return result;
  } catch (error) {
    throw new Error('Неверные данные для создания теста');
  }
}
