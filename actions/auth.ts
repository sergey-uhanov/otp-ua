'use server';

import { signIn, signOut } from '@/auth';
import { db } from '@/db';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
  revalidatePath('/');
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    redirectTo: '/',
  };

  const existingUser = await getUserByEmail(formData.get('email') as string);
  if (!existingUser) {
    return { error: 'Неправильний логін або пароль!' };
  }
  try {
    await signIn('credentials', rawFormData);
  } catch (error: any) {
    console.log('loginWithCreds error!!!!!!!!!!!!!!!!!!!!', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Неправильний логін або пароль!' };
        case 'CallbackRouteError':
          return { error: 'Неправильний логін або пароль!' };
        default:
          return { error: 'что-то пошло не так!!!!!!!!!!' };
      }
    }

    throw error;
  }
  revalidatePath('/');
};

export const createUser = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    redirectTo: '/',
  };

  const existingUser = await getUserByEmail(rawFormData.email);
  const hashedPassword = bcrypt.hashSync(rawFormData.password, 10);
  console.log('hashedPassword', hashedPassword);

  if (existingUser) {
    if (existingUser.hashedPassword === null) {
      console.log('hashedPassword', hashedPassword);
      let newUser;
      try {
        newUser = await db.user.update({
          where: {
            email: rawFormData.email,
          },
          data: {
            email: rawFormData.email,
            hashedPassword,
            name: rawFormData.name,
          },
        });
        return;
      } catch (error) {
        console.error('Ошибка при создании пользователя:', error);
        return;
      }
    }
    return { error: 'Користувач з таким email вже є в системі!' };
  }

  let newUser;
  try {
    newUser = await db.user.create({
      data: {
        email: rawFormData.email,
        hashedPassword,
        name: rawFormData.name,
      },
    });
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    return;
  }
};
