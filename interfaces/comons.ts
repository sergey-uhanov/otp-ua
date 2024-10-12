interface test {
  id?: string;
  testName: string;
  questions: question[];
  userId: string;
}
interface answer {
  id?: string;
  text: string;
  isCorrect: boolean;
}
interface question {
  id: string;
  type: TypeAnswerType;
  question: string;
  answers: answer[];
  image?: img | null;
}
interface img {
  url: string;
  public_id: string;
}
type TypeAnswerType = 'single' | 'multiple' | 'open' | '';
