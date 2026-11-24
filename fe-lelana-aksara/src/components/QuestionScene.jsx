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
    <div className="min-h-screen bg-stone-900 text-amber-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-stone-950 border-2 border-amber-500 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex justify-between items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-amber-500/20 border border-amber-500 text-amber-300 rounded-full text-xs font-bold">
            Tantangan Level {question.level} ({question.difficulty})
          </span>
          <div className="flex items-center gap-3">
            {skillBadge && (
              <span className="text-xs text-emerald-400 font-semibold">
                AI Adaptif: {skillBadge}
              </span>
            )}
            <button
              onClick={() => setShowExitConfirm(true)}
              className="px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Menu Utama
            </button>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold mb-4">{question.question_text}</h3>

        {/* Tampilan Aksara Jawa */}
        <div className="bg-amber-100 text-stone-950 rounded-2xl py-6 px-4 text-center mb-6 shadow-inner">
          <p className="font-jawa text-5xl md:text-6xl font-bold tracking-widest">
            {question.aksara_display}
          </p>
        </div>

        {/* Pilihan Jawaban */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelectedOption(opt.key)}
              disabled={feedback?.isCorrect}
              className={`p-3.5 rounded-xl border text-left font-semibold transition cursor-pointer ${
                selectedOption === opt.key
                  ? 'bg-amber-500 text-stone-950 border-amber-300'
                  : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-white'
              }`}
            >
              <span className="inline-block w-7 h-7 text-center leading-7 rounded-lg bg-black/20 mr-2 font-bold">
                {opt.key}
              </span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Box Petunjuk (Hint) */}
        {showHint && (
          <div className="mb-4 p-3.5 bg-blue-950/70 border border-blue-400/50 rounded-xl text-sm text-blue-200 text-left">
            💡 <b>Petunjuk:</b> {question.hint}
          </div>
        )}

        {/* Feedback Benar / Salah */}
        {feedback && (
          <div
            className={`mb-4 p-3.5 rounded-xl text-sm font-bold ${
              feedback.isCorrect
                ? 'bg-emerald-900/80 border border-emerald-400 text-emerald-200'
                : 'bg-red-900/80 border border-red-400 text-red-200'
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-3 bg-stone-800 hover:bg-stone-700 border border-amber-500/40 rounded-xl text-sm font-semibold cursor-pointer"
          >
            💡 {showHint ? 'Sembunyikan Hint' : 'Lihat Hint'}
          </button>

          <button
            onClick={handleConfirm}
            disabled={!selectedOption || feedback?.isCorrect}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold rounded-xl transition cursor-pointer"
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