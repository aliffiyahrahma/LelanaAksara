import React, { useState } from 'react';

export default function MainMenu({ onStartGame }) {
  const [modal, setModal] = useState(null); // 'petunjuk' | 'tentang' | null
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlay = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onStartGame(playerName.trim() || 'Siswa');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-stone-900 text-amber-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-stone-900/80 border-2 border-amber-500/50 rounded-2xl p-8 shadow-2xl text-center">
        <p className="font-jawa text-3xl text-amber-400 mb-2">ꦊꦭꦤ ꦲꦏ꧀ꦱꦫ</p>
        <h1 className="text-4xl font-extrabold tracking-wide text-amber-200 mb-2">
          LELANA AKSARA
        </h1>
        <p className="text-sm text-amber-100/80 mb-6">
          Petualangan Interaktif Legenda Gunung Budeg & Belajar Aksara Jawa
        </p>

        <form onSubmit={handlePlay} className="space-y-4">
          <input
            type="text"
            placeholder="Masukkan namamu (opsional)..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-amber-500/40 text-center text-white focus:outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-stone-950 font-bold text-lg rounded-xl shadow-lg transition cursor-pointer"
          >
            {isSubmitting ? 'Menyimpan...' : '▶ Play'}
          </button>
        </form>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            onClick={() => setModal('petunjuk')}
            className="py-2.5 bg-stone-800 hover:bg-stone-700 border border-amber-500/30 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            📖 Petunjuk
          </button>
          <button
            onClick={() => setModal('tentang')}
            className="py-2.5 bg-stone-800 hover:bg-stone-700 border border-amber-500/30 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            ℹ️ Tentang Game
          </button>
          <button
            onClick={() => window.close()}
            className="py-2.5 bg-red-950/80 hover:bg-red-900 border border-red-500/30 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            🚪 Exit
          </button>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
          <div className="bg-stone-900 border border-amber-500 rounded-2xl max-w-md w-full p-6 text-left">
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              {modal === 'petunjuk' ? 'Petunjuk Bermain' : 'Tentang Game'}
            </h2>
            {modal === 'petunjuk' ? (
              <ul className="list-disc list-inside space-y-2 text-sm text-amber-100/90">
                <li>Baca alur cerita Legenda Gunung Budeg dengan menekan tombol <b>Lanjut</b>.</li>
                <li>Di setiap akhir bagian cerita, selesaikan tantangan soal <b>Aksara Jawa</b>.</li>
                <li>Jika jawaban salah, gunakan <b>Petunjuk (Hint)</b> dan coba jawab kembali.</li>
                <li>Tingkat kesulitan soal akhir akan menyesuaikan kemampuanmu secara otomatis!</li>
              </ul>
            ) : (
              <p className="text-sm text-amber-100/90 leading-relaxed">
                <b>Lelana Aksara</b> adalah game edukasi berbasis web dengan metode <i>Interactive Storytelling</i> dan algoritma <i>Decision Tree</i> untuk mengenalkan Legenda Gunung Budeg serta pembelajaran Aksara Jawa (Nglegena, Sandhangan, dan Pasangan).
              </p>
            )}
            <button
              onClick={() => setModal(null)}
              className="mt-5 w-full py-2 bg-amber-500 text-stone-950 font-bold rounded-xl cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}