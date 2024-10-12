import { createUser } from '@/actions/auth';
import { validateRegistrationForm } from './validateRegistrationForm';

export async function handleRegistrationSubmit(formData: FormData) {
  const errors = validateRegistrationForm(formData);

  if (Object.keys(errors).length === 0) {
    try {
      await createUser(formData);

      return { success: true, message: 'Реєстрація успішна!' };
    } catch (error) {
      return { success: false, message: 'Помилка при реєстрації: ' + error };
    }
  } else {
    return { success: false, errors };
  }
}
