import { render, screen } from "@testing-library/react";
import { AppRouter } from "../routes/AppRouter";
import "../i18n";

test("renders the home route headline with app router wiring", () => {
  render(<AppRouter />);

  expect(
    screen.getByText("Bantu Anak Lebih Faham, Yakin & Fokus Dalam Pelajaran"),
  ).toBeInTheDocument();
});
