import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeaderSection } from "../../sections/HeaderSection";
import "../../i18n";

test("opens and closes the mobile navigation drawer", async () => {
  const user = userEvent.setup();

  render(<HeaderSection />);

  await user.click(screen.getByRole("button", { name: /toggle navigation menu/i }));

  const activityLinks = screen.getAllByRole("link", { name: /Aktiviti/i });
  expect(activityLinks.length).toBeGreaterThan(1);

  await user.click(activityLinks[activityLinks.length - 1]);
});
