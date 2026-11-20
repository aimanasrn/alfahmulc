import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { findStudent, getRecentPeriods } from "../../data/teacherRecord";
import { AppRouter } from "../../routes/AppRouter";
import "../../i18n";

const endpoint = "https://script.google.com/macros/s/test/exec";
const students = [
  { nama: "AHMAD AL AMIN", darjah: "Darjah 2" },
  { nama: "AQIF", darjah: "Darjah 3" },
];

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function respondWith(...bodies: unknown[]) {
  const fetchMock = vi.fn();
  bodies.forEach((body) => fetchMock.mockResolvedValueOnce({ json: () => Promise.resolve(body) }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentBody(fetchMock: ReturnType<typeof vi.fn>, call: number) {
  return fetchMock.mock.calls[call][1].body as URLSearchParams;
}

async function openForm() {
  render(<MemoryRouter initialEntries={["/portal/borang/rekod-guru"]}><AppRouter /></MemoryRouter>);
  await screen.findByRole("heading", { name: "Rekod Prestasi Pelajar" });
}

function fill(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

async function enterIcAndLoadStudents() {
  fill("No. IC guru", "900101-14-5678");
  fireEvent.blur(screen.getByLabelText("No. IC guru"));
  await screen.findByText("Taip beberapa huruf, kemudian pilih nama daripada senarai.");
}

function fillRecord(studentName = "Ahmad Al Amin") {
  fill("Nama pelajar", studentName);
  fill("Subjek", "Iqra");
  fill("Markah (%)", "70");
  fill("Kehadiran (%)", "75");
  fill("Kekuatan pelajar", "Bacaan baik");
  fill("Perlu dipertingkatkan", "Tajwid");
  fill("Ulasan guru", "Bagus");
  fill("Tindakan susulan", "Latihan harian");
}

test("loads students after the IC, then sends the chosen student and keeps teacher details", async () => {
  vi.stubEnv("VITE_REKOD_GURU_URL", endpoint);
  const fetchMock = respondWith({ ok: true, pelajar: students }, { ok: true });
  await openForm();
  expect(document.title).toBe("Rekod Prestasi Pelajar | AL-FAHMU Learning Centre");
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");

  await enterIcAndLoadStudents();
  const listRequest = sentBody(fetchMock, 0);
  expect(fetchMock.mock.calls[0][0]).toBe(endpoint);
  expect(listRequest.get("action")).toBe("senaraiPelajar");
  expect(listRequest.get("noIc")).toBe("900101145678");
  expect(document.querySelectorAll("#senarai-pelajar option")).toHaveLength(2);

  fillRecord();
  expect(screen.getByText("AHMAD AL AMIN · Darjah 2")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Hantar rekod" }));

  expect(await screen.findByRole("status")).toHaveTextContent("Rekod berjaya dihantar");
  const body = sentBody(fetchMock, 1);
  expect(body.get("namaPelajar")).toBe("AHMAD AL AMIN");
  expect(body.get("noIc")).toBe("900101-14-5678");
  expect(body.get("tempoh")).toBe(getRecentPeriods()[0]);
  expect(body.has("darjah")).toBe(false);

  expect(screen.getByLabelText("Nama pelajar")).toHaveValue("");
  expect(screen.getByLabelText("Markah (%)")).toHaveValue(null);
  expect(screen.getByLabelText("No. IC guru")).toHaveValue("900101-14-5678");
  expect(screen.getByLabelText("Subjek")).toHaveValue("Iqra");
});

test("blocks a name that is not in the student list", async () => {
  vi.stubEnv("VITE_REKOD_GURU_URL", endpoint);
  const fetchMock = respondWith({ ok: true, pelajar: students });
  await openForm();
  await enterIcAndLoadStudents();

  fillRecord("Pelajar Baru");
  fireEvent.click(screen.getByRole("button", { name: "Hantar rekod" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("Pilih nama pelajar daripada senarai.");
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

test("shows the server error when the IC is not registered", async () => {
  vi.stubEnv("VITE_REKOD_GURU_URL", endpoint);
  respondWith({ ok: false, error: "No. IC tidak berdaftar. Sila hubungi admin." });
  await openForm();

  fill("No. IC guru", "000000000000");
  fireEvent.blur(screen.getByLabelText("No. IC guru"));

  expect(await screen.findByText("No. IC tidak berdaftar. Sila hubungi admin.")).toBeInTheDocument();
});

test("does not call the sheet when the URL is missing", async () => {
  vi.stubEnv("VITE_REKOD_GURU_URL", "");
  const fetchMock = respondWith();
  await openForm();

  fill("No. IC guru", "900101-14-5678");
  fireEvent.blur(screen.getByLabelText("No. IC guru"));

  await waitFor(() => expect(screen.getByText(/belum disambungkan/)).toBeInTheDocument());
  expect(fetchMock).not.toHaveBeenCalled();
});

test("student lookup ignores case and extra spaces", () => {
  expect(findStudent(students, "  ahmad   al amin ")).toEqual(students[0]);
  expect(findStudent(students, "")).toBeUndefined();
});

test("period options use the text format stored in the sheet", () => {
  expect(getRecentPeriods(new Date(2026, 0, 15), 2)).toEqual(["JANUARI 2026", "DISEMBER 2025"]);
});
