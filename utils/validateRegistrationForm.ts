import { ErrorType } from '@/interfaces/auth.interface';

export const validateRegistrationForm = (formData: FormData): ErrorType => {
  let errors: ErrorType = {};
  const { name, email, password, confirmPassword } =
    Object.fromEntries(formData);

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.name = "Ім'я обов'язкове";
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.email = "Email обов'язковий";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Неправильний формат email';
  }

  if (!password || typeof password !== 'string') {
    errors.password = "Пароль обов'язковий";
  } else if (password.length < 2) {
    errors.password = 'Пароль повинен містити щонайменше 8 символів';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Паролі не співпадають';
  }

  return errors;
};
