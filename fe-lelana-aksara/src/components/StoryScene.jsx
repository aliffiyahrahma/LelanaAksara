import React, { useState } from 'react';
import ConfirmExitModal from './ConfirmExitModal';

export default function StoryScene({ chapter, onCompleteChapter, onBackToMenu }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const currentDialogue = chapter.dialogues[dialogueIndex];
  const isLastDialogue = dialogueIndex === chapter.dialogues.length - 1;

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
    <div className={`min-h-screen ${chapter.background} text-white flex flex-col justify-between p-4 md:p-8 transition-all duration-500`}>
      {/* Header Game Menu */}
      <div className="flex justify-between items-center bg-black/40 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
        <div className="text-left">
          <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
            Level {chapter.level} • {chapter.locationName}
          </span>
          <h2 className="text-lg font-bold text-white">{chapter.title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm cursor-pointer"
            title="Pengaturan Suara"
          >
            {isMuted ? '🔇 Bisu' : '🔊 Suara'}
          </button>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 rounded-lg text-sm font-semibold cursor-pointer"
          >
            Menu Utama
          </button>
        </div>
      </div>

      {/* Area Ilustrasi Karakter 2D */}
      <div className="flex-1 flex items-center justify-center my-4">
        {currentDialogue.character ? (
          <div className="text-center animate-bounce">
            <div className="text-8xl md:text-9xl drop-shadow-2xl">
              {currentDialogue.character}
            </div>
          </div>
        ) : (
          <div className="bg-black/30 px-6 py-3 rounded-full text-amber-200/80 text-sm italic">
            ~ Kisah Legenda Gunung Budeg ~
          </div>
        )}
      </div>

      {/* Dialogue Box */}
      <div className="max-w-4xl w-full mx-auto bg-stone-950/90 border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl text-left">
        <div className="inline-block bg-amber-500 text-stone-950 font-bold px-4 py-1 rounded-lg text-sm mb-3">
          {currentDialogue.speaker}
        </div>
        <p className="text-base md:text-lg leading-relaxed text-amber-50 min-h-[4.5rem]">
          {currentDialogue.text}
        </p>

        <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={dialogueIndex === 0}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              dialogueIndex === 0
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-stone-700 hover:bg-stone-600 text-white cursor-pointer'
            }`}
          >
            ⬅ Sebelumnya
          </button>

          <span className="text-xs text-stone-400">
            Dialog {dialogueIndex + 1} / {chapter.dialogues.length}
          </span>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl shadow transition cursor-pointer"
          >
            {isLastDialogue ? 'Tantangan Aksara ⚔️' : 'Lanjut ➡'}
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Keluar ke Menu Utama */}
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