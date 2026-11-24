import React from 'react';

export default function ConfirmExitModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-stone-900 border-2 border-amber-500 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
        <div className="text-4xl mb-3">⚠️</div>
        <h3 className="text-xl font-bold text-amber-300 mb-2">
          Tinggalkan Permainan?
        </h3>
        <p className="text-sm text-amber-100/90 leading-relaxed mb-6">
          Apakah kamu yakin ingin meninggalkan game ini dan kembali ke menu utama? Progres cerita yang sedang berjalan akan diulang dari awal.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-amber-100 font-semibold rounded-xl transition cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow transition cursor-pointer"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}