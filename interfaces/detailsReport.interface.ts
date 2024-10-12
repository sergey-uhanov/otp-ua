// Интерфейс для изображения (Image)
interface Image {
  url: string;
  public_id: string;
}

// Интерфейс для ответа на вопрос (Answer)
interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Интерфейс для вопроса (Question)
interface Question {
  id: string;
  type: string; // Здесь можно указать конкретный enum тип для TypeAnswerType
  question: string;
  answers: Answer[];
  image?: Image;
  testId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Интерфейс для пользователя, который создал тест (User)
interface User {
  id: string;
  name: string;
  email: string;
}

// Интерфейс для теста (Test)
interface Test {
  id: string;
  testName: string;
  questions: Question[];
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

// Интерфейс для ответа пользователя на вопрос (UserAnswer)
interface UserAnswer {
  id: string;
  questionId: string;
  answers: string[];
  isCorrect: boolean;
  ResultTestId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Интерфейс для результата теста (ResultTest)
interface ResultTest {
  id: string;
  userAnswers: UserAnswer[];
  test: Test;
  testId: string;
  userName: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

// Общий интерфейс для результата работы функции detailedReportResultTest
export interface DetailedReportResultTest {
  id: string;
  userAnswers: UserAnswer[];
  test: Test;
  testId: string;
  userName: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}
