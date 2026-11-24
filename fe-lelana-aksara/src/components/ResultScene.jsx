import React from 'react';

export default function ResultScene({ playerName, result, onPlayAgain, onBackToMenu }) {
  const recommendations = {
    Beginner: {
      badge: 'Pemula (Beginner)',
      color: 'text-amber-400 border-amber-400 bg-amber-950/50',
      text: 'Bagus! Kamu sudah menyelesaikan kisah Gunung Budeg. Ayo perbanyak latihan mengenali bentuk dan bunyi 20 huruf dasar Aksara Nglegena (Ha Na Ca Ra Ka).'
    },
    Intermediate: {
      badge: 'Menengah (Intermediate)',
      color: 'text-sky-400 border-sky-400 bg-sky-950/50',
      text: 'Hebat! Kamu sudah menguasai huruf dasar dengan baik. Selanjutnya, pelajari kembali variasi sandhangan swara (wulu, suku, taling, pepet, taling tarung).'
    },
    Advanced: {
      badge: 'Lanjutan (Advanced)',
      color: 'text-emerald-400 border-emerald-400 bg-emerald-950/50',
      text: 'Luar biasa! Pemahamanmu tentang Aksara Nglegena, Sandhangan, hingga Pasangan sudah sangat matang. Terus pertahankan dan coba baca kalimat Aksara Jawa yang lebih panjang!'
    }
  };

  const info = recommendations[result.skillLevel] || recommendations.Beginner;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-950 text-amber-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-stone-900 border-2 border-amber-500 rounded-2xl p-8 shadow-2xl text-center">
        <p className="text-amber-400 font-bold text-sm uppercase tracking-wider">
          Selamat, {playerName}!
        </p>
        <h2 className="text-3xl font-extrabold mt-1 mb-6">
          Cerita Gunung Budeg Selesai
        </h2>

        {/* Klasifikasi Decision Tree */}
        <div className={`p-4 rounded-xl border mb-6 ${info.color}`}>
          <p className="text-xs uppercase opacity-80">Tingkat Kemampuan (Decision Tree)</p>
          <p className="text-2xl font-extrabold mt-1">{info.badge}</p>
        </div>

        {/* Statistik Jawaban */}
        <div className="grid grid-cols-2 gap-3 text-left mb-6">
          <div className="bg-stone-800 p-3.5 rounded-xl">
            <p className="text-xs text-stone-400">Total Soal Dikerjakan</p>
            <p className="text-xl font-bold">{result.totalQuestions} Soal</p>
          </div>
          <div className="bg-stone-800 p-3.5 rounded-xl">
            <p className="text-xs text-stone-400">Persentase Benar</p>
            <p className="text-xl font-bold text-amber-400">{result.accuracyPercentage}%</p>
          </div>
          <div className="bg-stone-800 p-3.5 rounded-xl">
            <p className="text-xs text-stone-400">Jawaban Benar</p>
            <p className="text-xl font-bold text-emerald-400">{result.correctAnswers}</p>
          </div>
          <div className="bg-stone-800 p-3.5 rounded-xl">
            <p className="text-xs text-stone-400">Percobaan Salah</p>
            <p className="text-xl font-bold text-red-400">{result.wrongAnswers}</p>
          </div>
        </div>

        {/* Rekomendasi Materi */}
        <div className="bg-stone-800/70 border border-white/10 p-4 rounded-xl text-left mb-6">
          <p className="text-xs font-bold text-amber-300 uppercase mb-1">
            Rekomendasi Belajar:
          </p>
          <p className="text-sm text-amber-100/90 leading-relaxed">{info.text}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl cursor-pointer"
          >
            🔄 Main Lagi
          </button>
          <button
            onClick={onBackToMenu}
            className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 border border-amber-500/40 font-bold rounded-xl cursor-pointer"
          >
            🏠 Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
}