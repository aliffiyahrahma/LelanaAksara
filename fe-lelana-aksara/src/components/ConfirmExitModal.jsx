import React, { useEffect, useRef } from 'react';

export default function ConfirmExitModal({ isOpen, onConfirm, onCancel }) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
      }}
      className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div className="bg-stone-900 border-2 border-amber-500 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
        <div className="text-4xl mb-3" aria-hidden="true">⚠️</div>
        <h3
          id="exit-modal-title"
          className="text-xl font-bold text-amber-300 mb-2"
        >
          Tinggalkan Permainan?
        </h3>
        <p className="text-sm text-amber-100/90 leading-relaxed mb-6">
          Apakah kamu yakin ingin meninggalkan game ini dan kembali ke menu utama? Progres cerita yang sedang berjalan akan diulang dari awal.
        </p>

        <div className="flex gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 border border-stone-600 text-amber-100 font-semibold rounded-xl transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 text-white font-bold rounded-xl shadow transition cursor-pointer"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}