import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import "../i18n";

test("renders the student portal placeholder route", () => {
  render(
    <MemoryRouter initialEntries={["/portal/student"]}>
      <AppRouter />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: /Portal Pelajar/i })).toBeInTheDocument();
  expect(screen.getByText(/Jadual kelas/i)).toBeInTheDocument();
});
