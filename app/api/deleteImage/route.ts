import { NextResponse } from 'next/server';
import { cloud } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const { imageId } = await request.json();

    const result = await cloud.uploader.destroy(imageId);

    if (result.result === 'ok') {
      return NextResponse.json(
        { message: 'Image successfully deleted' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Image deletion failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
