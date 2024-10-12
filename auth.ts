import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from './db';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;

        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error('Неправильний логін або пароль!');
        }
        const isMatch = bcrypt.compareSync(
          credentials.password as string,
          user.hashedPassword
        );
        if (!isMatch) {
          throw new Error('Неправильний логін або пароль!');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account!.provider === 'google' || account!.provider === 'github') {
        // Пример логики для связывания аккаунтов
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          const existingAccount = await db.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account!.provider,
                providerAccountId: account!.providerAccountId,
              },
            },
          });

          if (!existingAccount) {
            await db.account.create({
              data: {
                userId: existingUser.id,
                provider: account!.provider,
                providerAccountId: account!.providerAccountId,
                type: 'oauth', // Задайте тип аккаунта, например, 'oauth'
                // Другие необходимые поля
              },
            });
          }
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
