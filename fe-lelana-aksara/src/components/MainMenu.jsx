import React, { useEffect, useRef, useState } from 'react';

export default function MainMenu({ onStartGame }) {
  const [modal, setModal] = useState(null); // 'petunjuk' | 'tentang' | null
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeModalBtnRef = useRef(null);

  useEffect(() => {
    if (!modal) return;

    closeModalBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal]);

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

  const safeAreaStyle = {
    paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
    paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
    paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
    paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
  };

  return (
    <div
      style={safeAreaStyle}
      className="relative min-h-svh w-full overflow-hidden bg-canvas-dots flex flex-col items-center justify-center"
    >
      {/* Cahaya pastel latar */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-200/45 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-orange-200/45 blur-3xl" />

      {/* Siluet Pegunungan Hijau Gunung Budeg */}
      <svg
        viewBox="0 0 1440 240"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-36 sm:h-52 text-teal-800/10 fill-current"
        preserveAspectRatio="none"
      >
        <path d="M0,240 L0,175 L240,115 L470,170 L740,55 L990,155 L1220,90 L1440,165 L1440,240 Z" />
      </svg>
      <svg
        viewBox="0 0 1440 180"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-24 sm:h-36 text-teal-900/15 fill-current"
        preserveAspectRatio="none"
      >
        <path d="M0,180 L0,120 L310,150 L580,85 L880,145 L1160,95 L1440,135 L1440,180 Z" />
      </svg>

      {/* Kartu Utama */}
      <div className="relative z-10 max-w-lg w-full rounded-[2rem] bg-white border-2 border-slate-200/80 p-7 sm:p-10 shadow-[0_24px_60px_-15px_rgba(15,118,110,0.14)] text-center">
        {/* Badge Kategori */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 mb-5">
          <span className="h-2 w-2 rounded-full bg-teal-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Petualangan Aksara Jawa
          </span>
        </div>

        {/* Aksara Jawa */}
        <div className="mb-2">
          <span className="inline-block px-4 py-1 rounded-2xl bg-orange-50 border border-orange-200/80 font-jawa text-2xl sm:text-3xl text-orange-600">
            ꦊꦭꦤ ꦲꦏ꧀ꦱꦫ
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-2 mb-2">
          LELANA <span className="text-teal-600">AKSARA</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-500 max-w-sm mx-auto leading-relaxed mb-7">
          Jelajahi kisah <span className="font-semibold text-slate-700">Legenda Gunung Budeg</span> sambil menaklukkan tantangan Aksara Jawa.
        </p>

        <form onSubmit={handlePlay} className="space-y-3.5">
          <div className="relative">
            <input
              type="text"
              aria-label="Nama pemain"
              placeholder="Ketik namamu di sini (opsional)..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal-300 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-500 active:translate-y-0.5 border-b-4 border-teal-800 active:border-b-0 disabled:opacity-60 text-white font-display font-bold text-lg rounded-2xl shadow-lg shadow-teal-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>{isSubmitting ? 'Menyiapkan Cerita...' : 'Mulai Bermain'}</span>
          </button>
        </form>

        <div className="grid grid-cols-3 gap-2.5 mt-6 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setModal('petunjuk')}
            className="py-2.5 px-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span aria-hidden="true">📖</span>
            <span>Petunjuk</span>
          </button>

          <button
            type="button"
            onClick={() => setModal('tentang')}
            className="py-2.5 px-3 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span aria-hidden="true">✨</span>
            <span>Tentang</span>
          </button>

          <button
            type="button"
            onClick={() => window.close()}
            className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span aria-hidden="true">🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Modal Petunjuk & Tentang */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="main-menu-modal-title"
          onClick={() => setModal(null)}
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top))',
            paddingRight: 'max(1rem, env(safe-area-inset-right))',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          }}
          className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-scene bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-7 text-left shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                id="main-menu-modal-title"
                className="font-display text-xl font-bold text-slate-900"
              >
                {modal === 'petunjuk' ? '📖 Petunjuk Bermain' : '✨ Tentang Game'}
              </h2>
              <button
                type="button"
                aria-label="Tutup modal"
                onClick={() => setModal(null)}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {modal === 'petunjuk' ? (
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold">1</span>
                  <span>Baca alur cerita Legenda Gunung Budeg dengan menekan tombol <b>Lanjut</b>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold">2</span>
                  <span>Di setiap akhir bagian cerita, selesaikan tantangan soal <b>Aksara Jawa</b>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold">3</span>
                  <span>Jika jawaban salah, gunakan <b>Petunjuk (Hint)</b> dan coba jawab kembali.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold">4</span>
                  <span>Tingkat kesulitan soal akhir akan menyesuaikan kemampuanmu secara otomatis!</span>
                </li>
              </ul>
            ) : (
              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-sm text-slate-600 leading-relaxed">
                <b className="text-teal-700">Lelana Aksara</b> adalah game edukasi berbasis web dengan metode <i>Interactive Storytelling</i> dan algoritma <i>Decision Tree</i> untuk mengenalkan Legenda Gunung Budeg serta pembelajaran Aksara Jawa (Nglegena, Sandhangan, dan Pasangan).
              </div>
            )}

            <button
              ref={closeModalBtnRef}
              type="button"
              onClick={() => setModal(null)}
              className="mt-6 w-full py-3 bg-teal-600 hover:bg-teal-500 border-b-4 border-teal-800 text-white font-bold rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 transition cursor-pointer"
            >
              Siap Bermain!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}