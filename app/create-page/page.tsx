import { getUserByEmail } from '@/actions/auth';
import { auth } from '@/auth';
import CreateTest from '@/components/CreateTest';
import React from 'react';
interface CreatepageProps {}
const Createpage = async ({}: CreatepageProps) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user.email);

  return <CreateTest userId={user?.id!} />;
};

export default Createpage;
