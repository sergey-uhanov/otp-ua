import { getTest } from '@/actions/tests';
import React from 'react';
import style from '@/styles/page/runTest.module.css';
import StepFormRunTest from '@/components/StepFormRunTest';

interface TestRunProps {
  params: {
    id: string;
  };
}
const TestRun = async ({ params }: TestRunProps) => {
  const { id } = params;
  const test: test | null = await getTest(id);

  if (test === null) {
    return <h1>Test not found</h1>;
  }
  return (
    <main className={style.test_container}>
      <h1 className={style.test_title}>{test.testName}</h1>
      <StepFormRunTest test={test} />
    </main>
  );
};

export default TestRun;
