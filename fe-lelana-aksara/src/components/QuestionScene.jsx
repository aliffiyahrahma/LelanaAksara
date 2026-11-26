import React, { useState, useEffect } from 'react';
import ConfirmExitModal from './ConfirmExitModal';

export default function QuestionScene({ question, skillBadge, onAnswerSuccess, onBackToMenu }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setShowHint(false);
    setFeedback(null);
    setAttempts(0);
    setWrongCount(0);
    setStartTime(Date.now());
  }, [question]);

  const handleConfirm = () => {
    if (!selectedOption) return;

    const currentAttempt = attempts + 1;
    setAttempts(currentAttempt);

    if (selectedOption === question.correct_option) {
      const timeTakenSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      setFeedback({
        isCorrect: true,
        message: 'Hebat! Jawabanmu benar. Cerita dapat dilanjutkan!'
      });
      setTimeout(() => {
        onAnswerSuccess({
          attempts: currentAttempt,
          wrongCount,
          timeTakenSeconds
        });
      }, 1200);
    } else {
      setWrongCount(wrongCount + 1);
      setShowHint(true);
      setFeedback({
        isCorrect: false,
        message: 'Kurang tepat! Perhatikan petunjuk di bawah lalu coba pilih lagi ya.'
      });
    }
  };

  const options = [
    { key: 'A', label: question.option_a },
    { key: 'B', label: question.option_b },
    { key: 'C', label: question.option_c },
    { key: 'D', label: question.option_d }
  ];

  return (
    <div className="min-h-svh bg-canvas-dots flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full bg-white border-2 border-slate-200/80 rounded-[2rem] p-5 sm:p-8 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.1)]">
        {/* Header Bar */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-5 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 bg-teal-50 border border-teal-200 text-teal-700 rounded-full text-xs font-extrabold">
              Level {question.level} • {question.difficulty}
            </span>
            {skillBadge && (
              <span className="px-3 py-1 bg-violet-50 border border-violet-200 text-violet-700 rounded-full text-xs font-bold">
                ✨ AI Adaptif: {skillBadge}
              </span>
            )}
          </div>

          <button
            onClick={() => setShowExitConfirm(true)}
            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Menu Utama
          </button>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-5 text-left leading-snug">
          {question.question_text}
        </h3>

        {/* Tampilan Aksara Jawa (Deep Emerald Card) */}
        <div className="relative rounded-2xl bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-950 py-7 px-5 text-center mb-6 shadow-inner overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-teal-400/15 blur-2xl" />
          <p className="font-jawa text-5xl sm:text-6xl font-bold tracking-widest text-amber-100 drop-shadow-sm">
            {question.aksara_display}
          </p>
        </div>

        {/* Pilihan Jawaban */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setSelectedOption(opt.key)}
                disabled={feedback?.isCorrect}
                className={`p-3.5 rounded-2xl border-2 text-left font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50 border-teal-500 border-b-4 text-teal-950 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 border-b-4 text-slate-700'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${
                    isSelected
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Box Petunjuk (Hint) */}
        {showHint && (
          <div className="animate-scene mb-4 p-4 bg-sky-50 border border-sky-200 rounded-2xl text-sm text-sky-900 text-left flex items-start gap-2.5">
            <span>💡</span>
            <div>
              <span className="font-bold">Petunjuk: </span>
              {question.hint}
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-4 p-4 rounded-2xl text-sm font-bold text-left flex items-center gap-2.5 ${
              feedback.isCorrect
                ? 'animate-scene bg-emerald-50 border border-emerald-300 text-emerald-800'
                : 'animate-shake bg-rose-50 border border-rose-300 text-rose-800'
            }`}
          >
            <span>{feedback.isCorrect ? '✅' : '⚠️'}</span>
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-1">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition cursor-pointer"
          >
            💡 {showHint ? 'Sembunyikan Hint' : 'Lihat Hint'}
          </button>

          <button
            onClick={handleConfirm}
            disabled={!selectedOption || feedback?.isCorrect}
            className="flex-1 py-3.5 px-6 bg-teal-600 hover:bg-teal-500 border-b-4 border-teal-800 active:border-b-0 active:translate-y-0.5 disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400 text-white font-display font-bold rounded-xl transition-all cursor-pointer"
          >
            Konfirmasi Jawaban ✔
          </button>
        </div>
      </div>

      <ConfirmExitModal
        isOpen={showExitConfirm}
        onCancel={() => setShowExitConfirm(false)}
        onConfirm={() => {
          setShowExitConfirm(false);
          onBackToMenu();
        }}
      />
    </div>
  );
}