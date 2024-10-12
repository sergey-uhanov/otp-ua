export const deleteImage = async (imageId: string) => {
  try {
    const response = await fetch('/api/deleteImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId }),
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
