// Interface for ResultTest model
export interface resultTest {
  id?: string;
  userAnswers?: userAnswers[];
  testId: string;
  userName: string;
  userEmail: string;
}

// Interface for UserAnswer model
export interface userAnswers {
  id?: string;
  questionId: string;
  answers: string[];
  isCorrect: boolean;
  ResultTestId?: string;
}
