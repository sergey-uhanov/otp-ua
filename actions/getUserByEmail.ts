import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '@/actions/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const user = await getUserByEmail(email);

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ error: 'User not found' });
  }
}
