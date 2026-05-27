export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export async function submitContactForm(payload: ContactPayload) {
  await Promise.resolve(payload);

  return {
    ok: true,
    message: "stub-success",
  };
}
