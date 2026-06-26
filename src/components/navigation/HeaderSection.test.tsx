import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeaderSection } from "../../sections/HeaderSection";
import "../../i18n";

test("opens and closes the mobile navigation drawer", async () => {
  const user = userEvent.setup();

  render(<HeaderSection />);

  expect(screen.getByText(/Kecemerlangan akademik dengan nilai Islam dan bimbingan yang prihatin/i)).toHaveClass(
    "site-brand__tagline",
  );

  await user.click(screen.getByRole("button", { name: /toggle navigation menu/i }));

  const activityLinks = screen.getAllByRole("link", { name: /Aktiviti/i });
  const enrollLinks = screen.getAllByRole("link", { name: /Daftar Sekarang/i });
  expect(activityLinks.length).toBeGreaterThan(1);
  expect(enrollLinks[enrollLinks.length - 1]).toHaveClass("mobile-drawer__cta");

  await user.click(activityLinks[activityLinks.length - 1]);
});
