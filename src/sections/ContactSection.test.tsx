import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactSection } from "./ContactSection";
import "../i18n";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

test("opens WhatsApp with the submitted contact details", async () => {
  const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
  const user = userEvent.setup();

  render(<ContactSection />);

  await user.type(screen.getByPlaceholderText("Nama ibu bapa atau penjaga"), "Aina Ahmad");
  await user.type(screen.getByPlaceholderText("Contoh: 012-345 6789"), "0123456789");
  await user.type(screen.getByPlaceholderText("Contoh: 8"), "9");
  await user.type(screen.getByPlaceholderText("Beritahu kami program yang anda minati."), "Saya berminat dengan kelas membaca.");
  await user.click(screen.getByRole("button", { name: "Hantar" }));

  expect(openSpy).toHaveBeenCalledTimes(1);

  const [url, target, features] = openSpy.mock.calls[0];
  expect(target).toBe("_blank");
  expect(features).toBe("noopener,noreferrer");
  expect(url).toContain("https://wa.me/601119815754?text=");

  const encodedMessage = new URL(url as string).searchParams.get("text");
  expect(encodedMessage).toContain("Aina Ahmad");
  expect(encodedMessage).toContain("0123456789");
  expect(encodedMessage).toContain("Umur Anak: 9");
  expect(encodedMessage).toContain("Saya berminat dengan kelas membaca.");

  openSpy.mockRestore();
});
