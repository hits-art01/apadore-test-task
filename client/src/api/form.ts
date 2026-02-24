import type { FormData } from "../utils/validateForm";

export const sendContactForm = async (formData: FormData) => {
  const response = await fetch("https://apadore-test-task.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

  return data;
};
