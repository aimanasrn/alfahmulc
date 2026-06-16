import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

test("switches between Bahasa Melayu and English labels", async () => {
  const user = userEvent.setup();
  await i18n.changeLanguage("ms");

  render(
    <I18nextProvider i18n={i18n}>
      <LanguageSwitcher />
    </I18nextProvider>,
  );

  expect(screen.getByRole("button", { name: /bm/i })).toHaveAttribute("aria-pressed", "true");

  await user.click(screen.getByRole("button", { name: /en/i }));

  expect(screen.getByRole("button", { name: /en/i })).toHaveAttribute("aria-pressed", "true");
});
