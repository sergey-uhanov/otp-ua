import { render, screen } from '@testing-library/react';
import FirstScreen from '@/components/FirstScreen';
import '@testing-library/jest-dom';

describe('FirstScreen', () => {
  it('renders the component with heading, paragraph and buttons', () => {
    render(<FirstScreen />);

    // Проверка заголовка
    const heading = screen.getByRole('heading', {
      name: /створіть свої ідеальні опитування та тести/i,
    });
    expect(heading).toBeInTheDocument();

    // Проверка текста параграфа
    const paragraph = screen.getByText(
      /наш інтуїтивний конструктор опитань та тестів/i
    );
    expect(paragraph).toBeInTheDocument();

    // Проверка кнопки "Створити опитування"
    const createButton = screen.getByRole('link', {
      name: /створити опитування/i,
    });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveAttribute('href', '/create-page');

    // Проверка кнопки "Преглянути приклади"
    const viewExamplesButton = screen.getByRole('link', {
      name: /преглянути приклади/i,
    });
    expect(viewExamplesButton).toBeInTheDocument();
    expect(viewExamplesButton).toHaveAttribute('href', '/');
  });

  it('renders the banner image with alt text', () => {
    render(<FirstScreen />);

    // Проверка изображения
    const image = screen.getByAltText('Mountains');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('/_next/image?url=%2Fimg.jpg&w=3840&q=75')
    );
  });
});
describe('FirstScreen Snapshot Test', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<FirstScreen />);
    expect(asFragment()).toMatchSnapshot();
  });
});
