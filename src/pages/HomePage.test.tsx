import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "../i18n";

test("renders the hero headline in default Malay", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(
    screen.getByText("Bantu Anak Lebih Faham, Yakin & Fokus Dalam Pelajaran"),
  ).toBeInTheDocument();
});
