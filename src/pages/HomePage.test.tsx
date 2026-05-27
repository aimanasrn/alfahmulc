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
      name: /Pendekatan pembelajaran yang kemas, jelas, dan menyenangkan untuk diikuti/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Subjek/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /KAFA/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Portal digital/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Mari berbincang/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Pautan pantas/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Buka WhatsApp Al-Fahmu Learning Centre/i }),
  ).toBeInTheDocument();
});
