import { deleteResultTest } from '@/actions/resultTest';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await deleteResultTest(id); // Ваша функция для удаления результата теста
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка удаления результата теста' },
      { status: 500 }
    );
  }
}