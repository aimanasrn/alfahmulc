import { act, renderHook } from "@testing-library/react";
import type { FormEvent } from "react";
import { useContactForm } from "./useContactForm";

test("validates required fields before submit", async () => {
  const { result } = renderHook(() => useContactForm());

  await act(async () => {
    await result.current.handleSubmit({
      preventDefault: () => undefined,
    } as FormEvent<HTMLFormElement>);
  });

  expect(result.current.errors.name).toBe("Nama diperlukan");
  expect(result.current.errors.phone).toBe("Nombor telefon diperlukan");
  expect(result.current.errors.email).toBe("Emel diperlukan");
  expect(result.current.errors.message).toBe("Mesej diperlukan");
});
