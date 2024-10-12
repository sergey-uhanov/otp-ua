import { NextResponse } from 'next/server';
import { cloud } from '@/lib/cloudinary';
import { Readable } from 'stream';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Преобразуем файл в поток
  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  try {
    // Оборачиваем `upload_stream` в Promise для работы с async/await
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloud.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.pipe(uploadStream); // Передаем поток данных в Cloudinary
    });

    // return NextResponse.json({ url: (result as any).secure_url });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
