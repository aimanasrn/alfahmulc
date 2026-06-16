import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import { Navbar } from "./Navbar";

test("switches language from Malay to English", async () => {
  const user = userEvent.setup();
  await i18n.changeLanguage("ms");

  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </I18nextProvider>,
  );

  await user.click(screen.getByRole("button", { name: "EN" }));

  expect(screen.getAllByRole("link", { name: "Enroll Now" }).length).toBeGreaterThan(0);
});
