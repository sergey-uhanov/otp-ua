import { getUserByEmail } from '@/actions/auth';
import { getAllTests } from '@/actions/tests';
import { auth } from '@/auth';
import style from '@/styles/page/readyTest.module.css';
import Link from 'next/link';

interface ReadyTestsProps {}
const ReadyTests = async ({}: ReadyTestsProps) => {
  const session = await auth();

  const user = await getUserByEmail(session!.user.email);
  const allTests = await getAllTests(user!.id);

  if (allTests.length === 0) {
    return (
      <main className={style.testsContainer}>
        <h1 className={style.noTests}>У вас немає готових тестів </h1>
      </main>
    );
  }
  return (
    <main className={style.testsContainer}>
      {allTests.map((testItem) => (
        <Link
          data-testid={testItem.testName}
          href={`/ready-tests/${testItem.id}`}
          key={testItem.id}
        >
          <div className={style.testItem}>
            <div className={style.testItemTitle} key={testItem.id}>
              {testItem.testName}
            </div>
            <div className={style.testItemDescription}>
              {`Кiлькiсть питань: ${testItem.questions.length} `}
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default ReadyTests;
