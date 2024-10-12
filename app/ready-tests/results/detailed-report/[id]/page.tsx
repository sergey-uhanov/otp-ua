import { detailedReportResultTest } from '@/actions/resultTest';
import { DetailedReportResultTest } from '@/interfaces/detailsReport.interface';
import { formateUkDate } from '@/utils/formateUkDate';
import style from '@/styles/page/detailed-report.module.css';
import React from 'react';
import ButtonDeleteResultTest from '@/components/UI/buttons/buttonDeleteResultTest';
interface DetalesResultTestProps {
  params: {
    id: string;
  };
}
const DetalesResultTest = async ({ params }: DetalesResultTestProps) => {
  const { id } = params;
  const detailsReport: DetailedReportResultTest | null =
    await detailedReportResultTest(id);
  if (!detailsReport) return <main>Немає деталiв</main>;

  const getQuestionById = (questionId: string) => {
    const result = detailsReport.test.questions.find(
      (question) => question.id === questionId
    );

    return result;
  };

  const getAnswersByQuestionId = (questionId: string) => {
    // Ищем вопрос по id
    const question = detailsReport.test.questions.find(
      (q: any) => q.id === questionId
    );

    // Если вопрос найден, возвращаем его ответы
    return question ? question.answers : null;
  };

  const getQuntityCorrectAnswer = () => {
    let count = 0;
    detailsReport.userAnswers.forEach((answer) => {
      if (answer.isCorrect) count++;
    });
    return count;
  };
  return (
    <main className={style.container}>
      <h1 className={style.title}>
        <span>Подробицi результату тесту:</span> {detailsReport.test.testName}
      </h1>
      <ButtonDeleteResultTest deleteResultTestId={detailsReport.id!} />
      <p>
        <span>Iм'я:</span> {detailsReport.userName}{' '}
      </p>
      <p>
        <span>Пошта:</span> {detailsReport.userEmail}{' '}
      </p>

      <p>
        <span>Дата та час проведення тесту:</span>{' '}
        {formateUkDate(detailsReport.createdAt)}
      </p>
      <p>
        <span>Кількість питань:</span> {detailsReport.test.questions.length}
      </p>
      <p>
        <span>Кількість правильних відповідей:{getQuntityCorrectAnswer()}</span>
      </p>
      <p>
        <span>
          Кількість не правильних відповідей:
          {detailsReport.test.questions.length - getQuntityCorrectAnswer()}
        </span>
      </p>
      {detailsReport.userAnswers.map((answer, index) => (
        <div
          key={answer.id}
          className={`${style.questionCard} ${
            answer.isCorrect ? style.correctUserAnswer : style.wrongUserAnswer
          } `}
        >
          <p>
            <span> питання</span> {index + 1}:{' '}
            {getQuestionById(answer.questionId)?.question}
          </p>
          <p>
            <span>відповіді користувача:</span> {answer.answers.join(', ')}
          </p>

          <div className={style.allAnswer}>
            <span style={{ fontWeight: 'bold' }}>Правильна відповідь:</span>
            {getAnswersByQuestionId(answer.questionId)?.map((item, index) => (
              <div
                key={item.id}
                className={`${
                  getAnswersByQuestionId(answer.questionId)?.length! - 1 ===
                  index
                    ? style.lastAnswer
                    : style.answer
                } ${item.isCorrect ? style.correctAnswer : style.wrongAnswer}`}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default DetalesResultTest;
