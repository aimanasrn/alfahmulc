import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ClipboardList, FileText, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getGoogleFormUrl, staffForms } from "../../data/staffForms";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import "./StaffFormsPage.css";

export default function StaffFormsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<
    { type: "switch"; nextId: string } | { type: "close" } | null
  >(null);
  const viewerHeading = useRef<HTMLHeadingElement>(null);
  const formButtons = useRef(new Map<string, HTMLButtonElement>());
  const selectedForm = staffForms.find((form) => form.id === selectedId);
  const nextForm = pendingAction?.type === "switch"
    ? staffForms.find((form) => form.id === pendingAction.nextId)
    : undefined;

  function selectForm(id: string) {
    if (selectedId !== null && selectedId !== id) {
      setPendingAction({ type: "switch", nextId: id });
      return;
    }

    showForm(id);
  }

  function showForm(id: string) {
    setSelectedId(id);
    requestAnimationFrame(() => {
      viewerHeading.current?.focus({ preventScroll: true });
      viewerHeading.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function confirmAction() {
    if (!pendingAction) return;
    setPendingAction(null);
    if (pendingAction.type === "switch") {
      showForm(pendingAction.nextId);
      return;
    }

    const button = selectedId ? formButtons.current.get(selectedId) : undefined;
    setSelectedId(null);
    button?.focus();
  }

  return (
    <main className="staff-forms">
      <div className="staff-forms__container">
        <header className="staff-forms__header">
          <Link className="staff-forms__brand" to="/" aria-label="AL-FAHMU Learning Centre — laman utama">
            <img src="/logo.png" alt="" width="52" height="52" />
            <span>AL-FAHMU<small>Learning Centre</small></span>
          </Link>
          <span className="staff-forms__audience">Rujukan admin &amp; guru</span>
        </header>

        <section className="staff-forms__intro" aria-labelledby="staff-forms-title">
          <span className="staff-forms__eyebrow"><ClipboardList size={16} aria-hidden="true" /> URUSAN PENGAJARAN</span>
          <h1 id="staff-forms-title">Pusat Borang</h1>
          <p>Semua borang urusan kelas dan tutor, di satu tempat. Pilih borang yang diperlukan untuk bermula.</p>
          <div className="staff-forms__note">Untuk rujukan admin dan guru. Sila kongsi pautan halaman ini kepada pihak berkenaan sahaja.</div>
        </section>

        <section className="staff-forms__grid" aria-label="Senarai borang">
          {staffForms.map((form, index) => (
            <article className="staff-form-card" key={form.id}>
              <div className="staff-form-card__top">
                <span className="staff-form-card__icon"><FileText size={22} aria-hidden="true" /></span>
                <span className="staff-form-card__number">0{index + 1}</span>
              </div>
              <span className="staff-form-card__category">{form.category}</span>
              <h2>{form.title}</h2>
              <p>{form.description}</p>
              <div className="staff-form-card__actions">
                {form.openExternally ? (
                  <a
                    className="staff-forms__primary"
                    href={getGoogleFormUrl(form.googleFormId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Isi borang (tab baharu): ${form.title}`}
                  >Isi borang <ArrowUpRight size={17} aria-hidden="true" /></a>
                ) : <button
                  type="button"
                  className="staff-forms__primary"
                  aria-label={`Isi borang: ${form.title}`}
                  aria-expanded={selectedId === form.id}
                  aria-controls={selectedForm ? "staff-form-viewer" : undefined}
                  ref={(button) => {
                    if (button) formButtons.current.set(form.id, button);
                    else formButtons.current.delete(form.id);
                  }}
                  onClick={() => selectForm(form.id)}
                >Isi borang <ArrowUpRight size={17} aria-hidden="true" /></button>}
                {form.openExternally ? <span className="staff-form-card__external-note">Dibuka di tab baharu</span> : (
                <a href={getGoogleFormUrl(form.googleFormId)} target="_blank" rel="noopener noreferrer" aria-label={`Buka di Google Forms (tab baharu): ${form.title}`}>
                  Buka di Google Forms <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                )}
              </div>
            </article>
          ))}
          <article className="staff-form-card">
            <div className="staff-form-card__top">
              <span className="staff-form-card__icon"><FileText size={22} aria-hidden="true" /></span>
              <span className="staff-form-card__number">0{staffForms.length + 1}</span>
            </div>
            <span className="staff-form-card__category">Laporan prestasi</span>
            <h2>Rekod Prestasi Pelajar</h2>
            <p>Rekodkan markah, kehadiran dan ulasan pelajar bagi setiap subjek.</p>
            <div className="staff-form-card__actions">
              <Link className="staff-forms__primary" to="/portal/borang/rekod-guru" aria-label="Isi borang: Rekod Prestasi Pelajar">
                Isi borang <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </section>

        {selectedForm ? (
          <section className="staff-form-viewer" id="staff-form-viewer" aria-labelledby="staff-form-viewer-title">
            <div className="staff-form-viewer__header">
              <div>
                <span className="staff-form-card__category">{selectedForm.category}</span>
                <h2 id="staff-form-viewer-title" tabIndex={-1} ref={viewerHeading}>{selectedForm.title}</h2>
              </div>
              <button className="staff-form-viewer__close" type="button" onClick={() => setPendingAction({ type: "close" })} aria-label="Tutup borang"><X size={20} aria-hidden="true" /></button>
            </div>
            <p className="staff-form-viewer__help">
              Borang tidak dipaparkan atau memerlukan log masuk Google?{" "}
              <a href={getGoogleFormUrl(selectedForm.googleFormId)} target="_blank" rel="noopener noreferrer">Buka di Google Forms (tab baharu) <ArrowUpRight size={14} aria-hidden="true" /></a>
            </p>
            <iframe
              key={selectedForm.id}
              src={getGoogleFormUrl(selectedForm.googleFormId, true)}
              title={selectedForm.title}
              className="staff-form-viewer__frame"
            />
          </section>
        ) : null}

        <footer className="staff-forms__footer">
          <Link to="/"><ArrowLeft size={16} aria-hidden="true" /> Kembali ke laman utama</Link>
          <span>AL-FAHMU Learning Centre</span>
        </footer>
      </div>
      {pendingAction && selectedForm ? (
        <ConfirmDialog
          title={pendingAction.type === "switch" ? "Tukar borang?" : "Tutup borang?"}
          description="Jawapan yang belum dihantar mungkin hilang. Pastikan anda sudah menghantar borang sebelum meneruskan."
          confirmLabel={pendingAction.type === "switch" ? "Ya, tukar borang" : "Ya, tutup borang"}
          detailLabel={nextForm ? "Borang seterusnya" : "Borang semasa"}
          detail={nextForm?.title ?? selectedForm.title}
          onConfirm={confirmAction}
          onCancel={() => setPendingAction(null)}
        />
      ) : null}
    </main>
  );
}
