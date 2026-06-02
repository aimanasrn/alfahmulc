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

test("renders core landing page sections", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Bantu Anak/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: /Pusat bimbingan yang mesra, profesional, dan fokus pada perkembangan sebenar pelajar/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Subjek/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /KAFA/i })).toBeInTheDocument();
  expect(
    screen.getAllByRole("heading", {
      name: /Maklum balas yang menunjukkan perubahan sebenar dalam pembelajaran/i,
    }).length,
  ).toBeGreaterThan(0);
  expect(screen.getAllByRole("button", { name: /Testimoni seterusnya/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /Portal digital/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Mari berbincang/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Pautan pantas/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Buka WhatsApp Al-Fahmu Learning Centre/i }),
  ).toBeInTheDocument();
});
