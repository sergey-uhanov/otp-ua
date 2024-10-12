export const disableFullscreen = () => {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error('Ошибка при отключении полноэкранного режима:', err);
      });
    }
  }
};
