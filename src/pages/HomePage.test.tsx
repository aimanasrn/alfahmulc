import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
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

test("renders the bilingual landing page sections", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getAllByText(/Seri Kembangan/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /Menyuburkan Ilmu, Membina Sahsiah/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Tentang AL-FAHMU/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Program Pembelajaran Kami/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Kenapa Ibu Bapa Memilih AL-FAHMU/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Kaedah Pembelajaran Kami/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Aktiviti Pembelajaran/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Apa Kata Ibu Bapa/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Berikan Anak Anda Pengalaman Pembelajaran Terbaik/i }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /Daftar Sekarang/i }).length).toBeGreaterThan(0);
});
