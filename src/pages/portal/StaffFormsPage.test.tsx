import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { AppRouter } from "../../routes/AppRouter";
import { staffForms, getGoogleFormUrl } from "../../data/staffForms";
import "../../i18n";

// JSDOM has no native dialog implementation; keyboard and focus trapping are
// verified in a real browser separately.
beforeAll(() => {
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: { configurable: true, value() { this.setAttribute("open", ""); } },
    close: { configurable: true, value() { this.removeAttribute("open"); } },
  });
});

beforeEach(() => {
  vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
});

afterEach(() => vi.restoreAllMocks());

async function openFormsPage() {
  render(<MemoryRouter initialEntries={["/portal/borang"]}><AppRouter /></MemoryRouter>);
  await screen.findByRole("heading", { name: "Pusat Borang" });
}

test("direct route shows four unique Google Forms without loading embeds and excludes search indexing", async () => {
  await openFormsPage();

  expect(document.title).toBe("Pusat Borang | AL-FAHMU Learning Centre");
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  expect(document.querySelector("iframe")).not.toBeInTheDocument();
  const links = screen.getAllByRole("link", { name: /(?:Buka di Google Forms|Isi borang \(tab baharu\))/ });
  expect(links).toHaveLength(4);
  expect(new Set(links.map((link) => link.getAttribute("href"))).size).toBe(4);
  staffForms.forEach((form, index) => {
    expect(screen.getByRole("heading", { name: form.title })).toBeInTheDocument();
    expect(links[index]).toHaveAttribute("href", getGoogleFormUrl(form.googleFormId));
    expect(links[index]).toHaveAttribute("target", "_blank");
    expect(links[index]).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test("embeds only the selected form and confirms before discarding a form", async () => {
  await openFormsPage();
  const first = staffForms[0];
  const second = staffForms[1];
  const confirm = vi.spyOn(window, "confirm");

  fireEvent.click(screen.getByRole("button", { name: `Isi borang: ${first.title}` }));
  expect(screen.getByTitle(first.title)).toHaveAttribute("src", getGoogleFormUrl(first.googleFormId, true));
  expect(screen.getByRole("button", { name: `Isi borang: ${first.title}` })).toHaveAttribute("aria-expanded", "true");

  fireEvent.click(screen.getByRole("button", { name: `Isi borang: ${second.title}` }));
  expect(screen.getByRole("alertdialog", { name: "Tukar borang?" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Kekalkan borang" })).toHaveFocus();
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.click(screen.getByRole("button", { name: "Kekalkan borang" }));
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe("");
  expect(screen.getByTitle(first.title)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: `Isi borang: ${second.title}` }));
  fireEvent.click(screen.getByRole("button", { name: "Ya, tukar borang" }));
  expect(document.querySelectorAll("iframe")).toHaveLength(1);
  expect(screen.getByTitle(second.title)).toHaveAttribute("src", getGoogleFormUrl(second.googleFormId, true));

  fireEvent.click(screen.getByRole("button", { name: "Tutup borang" }));
  expect(screen.getByRole("alertdialog", { name: "Tutup borang?" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Batal pengesahan" }));
  expect(screen.getByTitle(second.title)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Tutup borang" }));
  fireEvent.click(screen.getByRole("button", { name: "Ya, tutup borang" }));
  expect(document.querySelector("iframe")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: `Isi borang: ${second.title}` })).toHaveFocus();
  expect(confirm).not.toHaveBeenCalled();
  expect(document.body.style.overflow).toBe("");
});

test("escape and backdrop dismissal preserve the current iframe", async () => {
  await openFormsPage();
  fireEvent.click(screen.getByRole("button", { name: `Isi borang: ${staffForms[0].title}` }));
  const iframe = screen.getByTitle(staffForms[0].title);
  fireEvent.click(screen.getByRole("button", { name: "Tutup borang" }));
  fireEvent(screen.getByRole("alertdialog"), new Event("cancel", { cancelable: true }));
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  expect(screen.getByTitle(staffForms[0].title)).toBe(iframe);

  fireEvent.click(screen.getByRole("button", { name: "Tutup borang" }));
  fireEvent.click(screen.getByRole("alertdialog"));
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  expect(screen.getByTitle(staffForms[0].title)).toBe(iframe);
});
