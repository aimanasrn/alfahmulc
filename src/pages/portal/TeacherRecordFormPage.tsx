import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { classLevels, getRecentPeriods, recordSubjects } from "../../data/teacherRecord";
import "./StaffFormsPage.css";
import "./TeacherRecordFormPage.css";

type Status = "idle" | "sending" | "done" | "error";

const studentFields = {
  namaPelajar: "",
  markah: "",
  kehadiran: "",
  kekuatan: "",
  perluDipertingkatkan: "",
  ulasan: "",
  tindakan: "",
};

const longFields = [
  ["kekuatan", "Kekuatan pelajar"],
  ["perluDipertingkatkan", "Perlu dipertingkatkan"],
  ["ulasan", "Ulasan guru"],
  ["tindakan", "Tindakan susulan"],
] as const;

export default function TeacherRecordFormPage() {
  const periods = useMemo(() => getRecentPeriods(), []);
  const [values, setValues] = useState({
    ...studentFields,
    noIc: "",
    darjah: "",
    subjek: "",
    tempoh: periods[0],
    website: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function update(name: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (status === "done") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_REKOD_GURU_URL;

    if (!endpoint) {
      setError("Borang belum disambungkan ke Google Sheet. Sila hubungi admin.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new URLSearchParams(values),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!result.ok) {
        setError(result.error ?? "Rekod tidak dapat disimpan. Sila cuba lagi.");
        setStatus("error");
        return;
      }

      // Maklumat guru dan kelas dikekalkan untuk rekod pelajar seterusnya.
      setValues((current) => ({ ...current, ...studentFields }));
      setStatus("done");
    } catch {
      setError("Rekod tidak dapat dihantar. Semak internet dan cuba lagi.");
      setStatus("error");
    }
  }

  return (
    <main className="staff-forms">
      <div className="staff-forms__container">
        <header className="staff-forms__header">
          <Link className="staff-forms__brand" to="/" aria-label="AL-FAHMU Learning Centre — laman utama">
            <img src="/logo.png" alt="" width="52" height="52" />
            <span>AL-FAHMU<small>Learning Centre</small></span>
          </Link>
          <span className="staff-forms__audience">Untuk guru</span>
        </header>

        <section className="staff-forms__intro" aria-labelledby="teacher-record-title">
          <span className="staff-forms__eyebrow"><ClipboardList size={16} aria-hidden="true" /> LAPORAN PRESTASI</span>
          <h1 id="teacher-record-title">Rekod Prestasi Pelajar</h1>
          <p>Isi satu borang bagi setiap subjek. Gunakan ejaan nama pelajar yang sama untuk semua subjek.</p>
        </section>

        <form className="teacher-record" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Maklumat guru</legend>
            <label>
              No. IC guru
              <input
                type="password"
                inputMode="numeric"
                autoComplete="off"
                required
                maxLength={14}
                pattern="\d{6}-?\d{2}-?\d{4}"
                title="12 digit No. IC, dengan atau tanpa tanda sempang"
                value={values.noIc}
                onChange={(event) => update("noIc", event.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Maklumat kelas</legend>
            <label>
              Nama pelajar
              <input autoComplete="off" required maxLength={120} value={values.namaPelajar} onChange={(event) => update("namaPelajar", event.target.value)} />
            </label>
            <label>
              Darjah / Tingkatan
              <select required value={values.darjah} onChange={(event) => update("darjah", event.target.value)}>
                <option value="">Pilih</option>
                {classLevels.map((level) => <option key={level}>{level}</option>)}
              </select>
            </label>
            <label>
              Subjek
              <select required value={values.subjek} onChange={(event) => update("subjek", event.target.value)}>
                <option value="">Pilih</option>
                {recordSubjects.map((subject) => <option key={subject}>{subject}</option>)}
              </select>
            </label>
            <label>
              Tempoh laporan
              <select required value={values.tempoh} onChange={(event) => update("tempoh", event.target.value)}>
                {periods.map((period) => <option key={period}>{period}</option>)}
              </select>
            </label>
            <label>
              Markah (%)
              <input type="number" inputMode="decimal" min="0" max="100" step="0.1" required value={values.markah} onChange={(event) => update("markah", event.target.value)} />
            </label>
            <label>
              Kehadiran (%)
              <input type="number" inputMode="decimal" min="0" max="100" step="0.1" required value={values.kehadiran} onChange={(event) => update("kehadiran", event.target.value)} />
            </label>
          </fieldset>

          <fieldset>
            <legend>Ulasan</legend>
            {longFields.map(([name, label]) => (
              <label key={name}>
                {label}
                <textarea rows={3} required maxLength={1000} value={values[name]} onChange={(event) => update(name, event.target.value)} />
              </label>
            ))}
          </fieldset>

          <div className="teacher-record__trap" aria-hidden="true">
            <label>
              Laman web
              <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
            </label>
          </div>

          <div className="teacher-record__footer">
            <button className="staff-forms__primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Menghantar..." : "Hantar rekod"}
            </button>
            {status === "done" ? <p className="teacher-record__message" role="status">Rekod berjaya dihantar. Anda boleh isi rekod seterusnya.</p> : null}
            {status === "error" ? <p className="teacher-record__message teacher-record__message--error" role="alert">{error}</p> : null}
          </div>
        </form>

        <footer className="staff-forms__footer">
          <Link to="/portal/borang"><ArrowLeft size={16} aria-hidden="true" /> Kembali ke Pusat Borang</Link>
          <span>AL-FAHMU Learning Centre</span>
        </footer>
      </div>
    </main>
  );
}
