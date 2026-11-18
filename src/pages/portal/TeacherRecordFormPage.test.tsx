import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { getRecentPeriods } from "../../data/teacherRecord";
import { AppRouter } from "../../routes/AppRouter";
import "../../i18n";

const endpoint = "https://script.google.com/macros/s/test/exec";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function respondWith(body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({ json: () => Promise.resolve(body) });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function openForm() {
  render(<MemoryRouter initialEntries={["/portal/borang/rekod-guru"]}><AppRouter /></MemoryRouter>);
  await screen.findByRole("heading", { name: "Rekod Prestasi Pelajar" });
}

function fill(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillForm() {
  fill("Kod guru", "KOD123");
  fill("Nama guru", "Siti Aishah");
  fill("Nama pelajar", "Ahmad Al Amin");
  fill("Darjah / Tingkatan", "Darjah 2");
  fill("Subjek", "Iqra");
  fill("Markah (%)", "70");
  fill("Kehadiran (%)", "75");
  fill("Kekuatan pelajar", "Bacaan baik");
  fill("Perlu dipertingkatkan", "Tajwid");
  fill("Ulasan guru", "Bagus");
  fill("Tindakan susulan", "Latihan harian");
}

test("sends the record and keeps teacher details for the next student", async () => {
  vi.stubEnv("VITE_REKOD_GURU_URL", endpoint);
  const fetchMock = respondWith({ ok: true });
  await openForm();
  expect(document.title).toBe("Rekod Prestasi Pelajar | AL-FAHMU Learning Centre");
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");

  fillForm();
  fireEvent.click(screen.getByRole("button", { name: "Hantar rekod" }));

  expect(await screen.findByRole("status")).toHaveTextContent("Rekod berjaya dihantar");
  const [url, options] = fetchMock.mock.calls[0];
  const body = options.body as URLSearchParams;
  expect(url).toBe(endpoint);
  expect(body.get("kodGuru")).toBe("KOD123");
  expect(body.get("namaPelajar")).toBe("Ahmad Al Amin");
  expect(body.get("tempoh")).toBe(getRecentPeriods()[0]);
  expect(body.get("markah")).toBe("70");

  expect(screen.getByLabelText("Nama pelajar")).toHaveValue("");
  expect(screen.getByLabelText("Markah (%)")).toHaveValue(null);
  expect(screen.getByLabelText("Nama guru")).toHaveValue("Siti Aishah");
  expect(screen.getByLabelText("Subjek")).toHaveValue("Iqra");
});

test("shows the server error and keeps the answers", async () => {
  vi.stubEnv("VITE_REKOD_GURU_URL", endpoint);
  respondWith({ ok: false, error: "Kod guru tidak sah." });
  await openForm();

  fillForm();
  fireEvent.click(screen.getByRole("button", { name: "Hantar rekod" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("Kod guru tidak sah.");
  expect(screen.getByLabelText("Nama pelajar")).toHaveValue("Ahmad Al Amin");
});

test("does not send when the sheet URL is missing", async () => {
  vi.stubEnv("VITE_REKOD_GURU_URL", "");
  const fetchMock = respondWith({ ok: true });
  await openForm();

  fillForm();
  fireEvent.click(screen.getByRole("button", { name: "Hantar rekod" }));

  await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("belum disambungkan"));
  expect(fetchMock).not.toHaveBeenCalled();
});

test("period options use the text format stored in the sheet", () => {
  expect(getRecentPeriods(new Date(2026, 0, 15), 2)).toEqual(["JANUARI 2026", "DISEMBER 2025"]);
});
