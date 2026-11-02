import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { ArrowRight, TriangleAlert, X } from "lucide-react";
import "./ConfirmDialog.css";

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  detailLabel: string;
  detail: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title, description, confirmLabel, detailLabel, detail, onConfirm, onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    cancelRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function cancel() {
    dialogRef.current?.close();
    onCancel();
  }

  function confirm() {
    dialogRef.current?.close();
    onConfirm();
  }

  function keepFocusInDialog(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="confirm-dialog"
      role="alertdialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => { event.preventDefault(); cancel(); }}
      onClick={(event) => { if (event.target === event.currentTarget) cancel(); }}
      onKeyDown={keepFocusInDialog}
    >
      <div className="confirm-dialog__content">
        <button type="button" className="confirm-dialog__close" aria-label="Batal pengesahan" onClick={cancel}>
          <X size={19} aria-hidden="true" />
        </button>
        <div className="confirm-dialog__icon"><TriangleAlert size={28} strokeWidth={1.8} aria-hidden="true" /></div>
        <span className="confirm-dialog__eyebrow">SEBELUM ANDA TERUSKAN</span>
        <h2 id={`${id}-title`}>{title}</h2>
        <p id={`${id}-description`}>{description}</p>
        <div className="confirm-dialog__detail">
          <span>{detailLabel}</span>
          <strong>{detail}</strong>
        </div>
        <div className="confirm-dialog__actions">
          <button ref={cancelRef} type="button" className="confirm-dialog__cancel" onClick={cancel}>Kekalkan borang</button>
          <button type="button" className="confirm-dialog__confirm" onClick={confirm}>{confirmLabel}<ArrowRight size={16} aria-hidden="true" /></button>
        </div>
        <p className="confirm-dialog__hint">Pilih “Kekalkan borang” untuk terus mengisi.</p>
      </div>
    </dialog>
  );
}
