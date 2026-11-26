import React, { useState, useEffect } from 'react';
import ConfirmExitModal from './ConfirmExitModal';
import CharacterAvatar from './CharacterAvatar';
import SceneBackdrop from './SceneBackdrop';

export default function StoryScene({ chapter, onCompleteChapter, onBackToMenu }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    setDialogueIndex(0);
  }, [chapter]);

  const currentDialogue = chapter.dialogues[dialogueIndex];
  const isLastDialogue = dialogueIndex === chapter.dialogues.length - 1;
  const progressPercent = ((dialogueIndex + 1) / chapter.dialogues.length) * 100;

  const handleNext = () => {
    if (!isLastDialogue) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setDialogueIndex(0);
      onCompleteChapter(chapter.questionLevel);
    }
  };

  const handlePrev = () => {
    if (dialogueIndex > 0) {
      setDialogueIndex(dialogueIndex - 1);
    }
  };

  return (
    <div className={`relative min-h-svh ${chapter.background} flex flex-col justify-between p-4 sm:p-6 md:p-8 transition-all duration-500 overflow-hidden`}>
      {/* Latar Belakang Pemandangan Ilustrasi */}
      <SceneBackdrop locationName={chapter.locationName} level={chapter.level} />

      {/* Header Cerita (Floating White Card) */}
      <div className="relative z-20 max-w-4xl w-full mx-auto bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3.5 rounded-2xl border border-white shadow-lg">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] uppercase tracking-wider font-extrabold">
                Level {chapter.level}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                📍 {chapter.locationName}
              </span>
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {chapter.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
              title="Pengaturan Suara"
            >
              {isMuted ? '🔇 Bisu' : '🔊 Suara'}
            </button>
            <button
              onClick={() => setShowExitConfirm(true)}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Area Panggung Visual Novel (Karakter / Narasi + Kotak Dialog menyatu di bawah) */}
      <div className="relative z-20 max-w-4xl w-full mx-auto mt-auto pt-8">
        {/* Saat Narasi, tampilkan lencana lokasi yang rapi di atas kotak dialog */}
        {!currentDialogue.character && currentDialogue.speaker?.toLowerCase().includes('narasi') ? (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-slate-700 text-xs sm:text-sm font-bold shadow-lg">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span>Kisah Legenda Gunung Budeg</span>
            </div>
          </div>
        ) : (
          /* Ilustrasi Karakter Custom SVG berdiri tepat di atas kotak dialog */
          <div className="flex justify-center -mb-5 relative z-10">
            <CharacterAvatar
              speaker={currentDialogue.speaker}
              character={currentDialogue.character}
            />
          </div>
        )}

        {/* Speaker Nameplate */}
        <div className="relative z-30 inline-flex items-center ml-5 -mb-3.5 bg-orange-500 text-white font-display font-bold px-5 py-1.5 rounded-xl text-sm shadow-md">
          {currentDialogue.speaker}
        </div>

        {/* Kotak Dialog Putih Bersih */}
        <div className="relative z-20 bg-white/95 backdrop-blur-md border-2 border-white rounded-3xl p-6 pt-8 sm:p-7 sm:pt-9 shadow-2xl text-left">
          <p
            key={dialogueIndex}
            className="animate-scene text-base sm:text-lg font-medium leading-relaxed text-slate-800 min-h-[4.5rem]"
          >
            {currentDialogue.text}
          </p>

          <div className="flex flex-wrap justify-between items-center gap-3 mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={dialogueIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                dialogueIndex === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
              }`}
            >
              ← Sebelumnya
            </button>

            <span className="text-xs font-semibold text-slate-400">
              {dialogueIndex + 1} / {chapter.dialogues.length}
            </span>

            <button
              onClick={handleNext}
              className={`px-6 py-2.5 font-display font-bold rounded-xl border-b-4 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer ${
                isLastDialogue
                  ? 'bg-orange-500 hover:bg-orange-400 border-orange-700 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-teal-600 hover:bg-teal-500 border-teal-800 text-white shadow-md shadow-teal-600/20'
              }`}
            >
              {isLastDialogue ? 'Tantangan Aksara ⚔️' : 'Lanjut →'}
            </button>
          </div>
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