import { render, screen, within } from "@testing-library/react";
import { GallerySection } from "./GallerySection";
import i18n from "../i18n";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

test("renders a mini activity gallery with client images", async () => {
  await i18n.changeLanguage("en");

  render(<GallerySection />);

  const miniGallery = screen.getByRole("region", { name: /activity highlights gallery/i });

  expect(within(miniGallery).getByRole("heading", { name: /Activity Highlights/i })).toBeInTheDocument();
  expect(within(miniGallery).getAllByRole("img")).toHaveLength(8);
});

test("renders uploaded activity images in the gallery and mini gallery", async () => {
  await i18n.changeLanguage("en");

  render(<GallerySection />);

  expect(screen.getByAltText(/^Classroom Learning activity$/i)).toHaveAttribute(
    "src",
    "/aktivitipembelajaran/pembelajarandalamkelas.png",
  );

  const miniGallery = screen.getByRole("region", { name: /activity highlights gallery/i });
  const miniGalleryImages = within(miniGallery).getAllByRole("img");

  expect(miniGalleryImages.map((image) => image.getAttribute("src"))).toEqual([
    "/minigaleri/03.jpg",
    "/minigaleri/04.jpg",
    "/minigaleri/05.png",
    "/minigaleri/06.png",
    "/minigaleri/07.png",
    "/minigaleri/08.png",
    "/minigaleri/09.jpg",
    "/minigaleri/kelasmembaca.jpg",
  ]);
});
