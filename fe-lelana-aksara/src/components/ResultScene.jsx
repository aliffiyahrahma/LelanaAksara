import React from 'react';

export default function ResultScene({ playerName, result, onPlayAgain, onBackToMenu }) {
  const recommendations = {
    Beginner: {
      badge: 'Pemula (Beginner)',
      color: 'text-orange-700 border-orange-200 bg-orange-50',
      barColor: 'bg-orange-500',
      text: 'Bagus! Kamu sudah menyelesaikan kisah Gunung Budeg. Ayo perbanyak latihan mengenali bentuk dan bunyi 20 huruf dasar Aksara Nglegena (Ha Na Ca Ra Ka).'
    },
    Intermediate: {
      badge: 'Menengah (Intermediate)',
      color: 'text-sky-700 border-sky-200 bg-sky-50',
      barColor: 'bg-sky-500',
      text: 'Hebat! Kamu sudah menguasai huruf dasar dengan baik. Selanjutnya, pelajari kembali variasi sandhangan swara (wulu, suku, taling, pepet, taling tarung).'
    },
    Advanced: {
      badge: 'Lanjutan (Advanced)',
      color: 'text-emerald-700 border-emerald-200 bg-emerald-50',
      barColor: 'bg-emerald-500',
      text: 'Luar biasa! Pemahamanmu tentang Aksara Nglegena, Sandhangan, hingga Pasangan sudah sangat matang. Terus pertahankan dan coba baca kalimat Aksara Jawa yang lebih panjang!'
    }
  };

  const info = recommendations[result.skillLevel] || recommendations.Beginner;

  return (
    <div className="min-h-svh bg-canvas-dots flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(15,118,110,0.14)] text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-3xl shadow-xs">
          🏆
        </div>

        <p className="text-teal-600 font-bold text-xs uppercase tracking-widest">
          Selamat, {playerName}!
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-6">
          Cerita Gunung Budeg Selesai
        </h2>

        {/* Klasifikasi Decision Tree */}
        <div className={`p-4 rounded-2xl border-2 mb-6 ${info.color}`}>
          <p className="text-[11px] uppercase tracking-wider font-bold opacity-80">
            Tingkat Kemampuan (Decision Tree)
          </p>
          <p className="font-display text-2xl font-extrabold mt-1">{info.badge}</p>
        </div>

        {/* Statistik Jawaban */}
        <div className="grid grid-cols-2 gap-3 text-left mb-6">
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
            <p className="text-xs font-medium text-slate-500">Total Soal</p>
            <p className="font-display text-xl font-extrabold text-slate-800 mt-0.5">
              {result.totalQuestions} Soal
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
            <p className="text-xs font-medium text-slate-500">Persentase Benar</p>
            <p className="font-display text-xl font-extrabold text-teal-600 mt-0.5">
              {result.accuracyPercentage}%
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full ${info.barColor}`}
                style={{ width: `${Math.min(100, result.accuracyPercentage)}%` }}
              />
            </div>
          </div>
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl">
            <p className="text-xs font-medium text-emerald-700">Jawaban Benar</p>
            <p className="font-display text-xl font-extrabold text-emerald-700 mt-0.5">
              {result.correctAnswers}
            </p>
          </div>
          <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-2xl">
            <p className="text-xs font-medium text-rose-700">Percobaan Salah</p>
            <p className="font-display text-xl font-extrabold text-rose-600 mt-0.5">
              {result.wrongAnswers}
            </p>
          </div>
        </div>

        {/* Rekomendasi Materi */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left mb-6">
          <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wider mb-1">
            💡 Rekomendasi Belajar
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{info.text}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-500 border-b-4 border-teal-800 active:border-b-0 active:translate-y-0.5 text-white font-display font-bold rounded-xl transition-all cursor-pointer"
          >
            🔄 Main Lagi
          </button>
          <button
            onClick={onBackToMenu}
            className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 border-b-4 border-slate-300 active:border-b-0 active:translate-y-0.5 text-slate-700 font-display font-bold rounded-xl transition-all cursor-pointer"
          >
            🏠 Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
}