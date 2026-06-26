import { render, screen, within } from "@testing-library/react";
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

test("renders desktop navigation links with compact text styling", async () => {
  await i18n.changeLanguage("en");

  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </I18nextProvider>,
  );

  const primaryNavigation = screen.getByRole("navigation", { name: "Primary navigation" });

  expect(within(primaryNavigation).getByRole("link", { name: "Home" })).toHaveClass(
    "site-nav__link--compact",
  );
});

test("renders the desktop enroll button with compact header styling", async () => {
  await i18n.changeLanguage("en");

  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </I18nextProvider>,
  );

  const headerActions = screen.getByRole("button", { name: "EN" }).closest(".site-header__actions");

  expect(headerActions).not.toBeNull();
  expect(within(headerActions as HTMLElement).getByRole("link", { name: "Enroll Now" })).toHaveClass(
    "site-header__cta--compact",
  );
});
