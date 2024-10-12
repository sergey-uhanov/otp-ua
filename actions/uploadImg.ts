import { UploadApiResponse } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function UploadImg(
  imgFormData: FormData
): Promise<UploadApiResponse | null> {
  try {
    const response = await fetch('/api/uploadFile', {
      method: 'POST',
      body: imgFormData,
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке файла');
    }

    const result: UploadApiResponse = await response.json();

    return result;
  } catch (error) {
    return null;
    console.error('Ошибка:', error);
  }
}
