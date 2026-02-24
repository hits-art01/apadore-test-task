export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  apartmentType: "1+KK" | "2+KK" | "3+KK" | "4+KK";
  newsletter: boolean;
  consent: boolean;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export const validateContactForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  const lettersOnly = /^[A-Za-zÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]+$/;

  if (!lettersOnly.test(formData.firstName.trim())) {
    errors.firstName = "Hláška erroru";
  }

  if (!lettersOnly.test(formData.lastName.trim())) {
    errors.lastName = "Hláška erroru";
  }

  if (!/^\+?\d{9,15}$/.test(formData.phone)) {
    errors.phone = "Hláška erroru";
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    errors.email = "Hláška erroru";
  }

  if (!formData.consent) {
    errors.consent = "Hláška erroru";
  }

  return errors;
};
